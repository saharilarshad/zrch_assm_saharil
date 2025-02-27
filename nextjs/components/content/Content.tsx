"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast, Toaster } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Pencil, BookCheck, ChevronDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  // AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Loading from "../ui/loading/Loading";
import { addItem, deleteItem, getItems, Item, updateItem } from "@/redux/items.slice";
import { TDeleteData, TEditeData, TEditedData, TEditedItem, TFilterData } from "@/types";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import { groupItemsByLocation, groupItemsByProductCode } from "@/lib/groupData";
// import { addItem, deleteItem, updateItem } from "./store/items.slice";

const formSchema = z.object({
  productCode: z.number().min(4, {
    message: "productCode must be at least 4 characters.",
  }),
  location: z.string().min(2, {
    message: "location must be at least 2 characters.",
  }),
  premiumPaid: z.number().min(1, {
    message: "premiumPaid must be a number and at least 1 characters.",
  }),
});

const Content = () => {
  const queryClient = useQueryClient();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [filter, setFilter] = useState<TFilterData>({
    productCode: null,
    location: "",
  });
  const [editItem, setEditItem] = useState<TEditeData>({
    billingId: null,
    productId: null,
  });
  const [editedItem, setEditedItem] = useState<TEditedData>({
    productCode: null,
    location: "",
    premiumPaid: null,
  });
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector(
    (state: RootState) => state.items
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productCode: 0,
      location: "",
      premiumPaid: 0,
    },
  });

  const { productCode, location } = filter;

  useEffect(() => {
    dispatch(
      getItems({
        productCode,
        location,
      })
    );
  }, [dispatch, productCode, location]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log("values",values)
    dispatch(
      addItem({
        productCode: values.productCode,
        location: values.location,
        premiumPaid: values.premiumPaid,
      })
    );
    if (status === "failed") {
      toast.error(error);
      return;
    }
    form.reset({
      productCode: 0,
      location: "",
      premiumPaid: 0,
    });
    toast.success("Item added successfully!");
  }

  function handleUpdate(data: TEditedItem) {
    // console.log("dataupdate", data);
    // console.log("dataupdate", data, editItem.productId);

    const dataUpdate = {
      ...data,
      productCode: editItem.productId,
      billingId: editItem.billingId,
    };

    console.log("dataUpdate", dataUpdate);
    if (
      !dataUpdate.billingId &&
      !dataUpdate.productCode &&
      !data.location &&
      !data.premiumPaid
    ) {
      toast.error("No Data to be update");
      setEditItem({
        billingId: null,
        productId: null,
      });
      return;
    }

    dispatch(
      updateItem({
        billingId: dataUpdate.billingId as number,
        productCode: dataUpdate.productCode as number,
        location: dataUpdate.location,
        premiumPaid: dataUpdate.premiumPaid as number,
      })
    );

    if (status === "failed") {
      toast.error(error);
      return;
    }

    setEditItem({
      billingId: null,
      productId: null,
    });
    setEditedItem({
      productCode: null,
      location: "",
      premiumPaid: null,
    });

    dispatch(
      getItems({
        productCode,
        location,
      })
    );

    toast.success("Item updated successfully!");
  }

  function handleDelete(item:number) {
    console.log(item);

    dispatch(deleteItem(item as number));

    if (status === "failed") {
      toast.error(error);
      return;
    }

    setSelectedDeleteId(null);


    toast.success("Item deleted successfully!");
  }


  const groupedItemsLocation = items && groupItemsByLocation(items);
  const groupedItemsProduct = items && groupItemsByProductCode(items);

  const handleProductSelect = (productCode: number) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      productCode: productCode,
    }));
  };

  const handleLocationSelect = (location: string) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      location: location,
    }));
  };

  console.log("items", items);
  console.log("selectedDeleteId", selectedDeleteId);
  // console.log("filter", filter);

  return (
    <>
      <Toaster position="top-center" richColors closeButton />
      {status === "loading" ? (
        <Loading />
      ) : (
        <>
          <div className="mt-20 flex flex-col gap-5 items-center justify-center w-screen">
            <div className="flex items-center gap-5">
              <Button
                className={`${!isAdmin && "bg-green-400"}`}
                onClick={() => setIsAdmin(false)}
              >
                User
              </Button>
              <Button
                className={`${isAdmin && "bg-green-400"}`}
                onClick={() => setIsAdmin(true)}
              >
                Admin
              </Button>
            </div>

            {isAdmin && (
              <>
                <h2 className="text-2xl font-semibold">Add Product Here!</h2>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 w-1/3"
                  >
                    <FormField
                      control={form.control}
                      name="productCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Code</FormLabel>
                          <FormControl>
                            <Input type="number"
                              placeholder="Product Code"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            This is your display Product Code.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="Location" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is your Location.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="premiumPaid"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Premium Paid</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Premium Paid"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            This is your Premium Paid.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center justify-center w-full">
                      <Button className="w-1/2" type="submit">
                        Submit
                      </Button>
                    </div>
                  </form>
                </Form>
              </>
            )}

            {!isAdmin && (
              <div className="flex items-center gap-5">
                <div>
                  <Label className="text-xl font-semibold">Filtering :</Label>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                      Product Code{" "}
                      <ChevronDown className="text-muted-foreground" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="end">
                    <Command>
                      <CommandInput placeholder="Select new role..." />
                      <CommandList>
                        <CommandEmpty>No product code found.</CommandEmpty>
                        <CommandGroup>
                          {items &&
                            Object.keys(groupedItemsProduct).map(
                              (productId: string, index: number) => (
                                <React.Fragment key={index}>
                                  <CommandItem
                                    className="teamaspace-y-1 flex flex-col items-start px-4 py-2"
                                    // onClick={() => handleProductSelect(+productId)}
                                  >
                                    <p
                                      onClick={() =>
                                        handleProductSelect(+productId)
                                      }
                                    >
                                      {productId}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      This Product Code {productId}.
                                    </p>
                                  </CommandItem>
                                </React.Fragment>
                              )
                            )}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                      Location <ChevronDown className="text-muted-foreground" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="end">
                    <Command>
                      <CommandInput placeholder="Select new role..." />
                      <CommandList>
                        <CommandEmpty>No location found.</CommandEmpty>
                        <CommandGroup>
                          {items &&
                            Object.keys(groupedItemsLocation).map(
                              (loc: string, index: number) => (
                                <React.Fragment key={index}>
                                  <CommandItem
                                    className="teamaspace-y-1 flex flex-col items-start px-4 py-2"
                                    // onClick={() => {
                                    //   handleLocationSelect(loc)
                                    //   console.log("clicked")
                                    //   }}
                                  >
                                    <p
                                      onClick={() => handleLocationSelect(loc)}
                                    >
                                      {loc}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      This Location at {loc}.
                                    </p>
                                  </CommandItem>
                                </React.Fragment>
                              )
                            )}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <Button
                  className="bg-orange-300"
                  onClick={() => setFilter({ productCode: null, location: "" })}
                >
                  Clear Filter
                </Button>
              </div>
            )}

            {isAdmin && (
              <div className="p-5 w-full flex items-center justify-center">
                <Table className="">
                  <TableCaption>A List Billing Data.</TableCaption>
                  <TableHeader className="w-full text-center">
                    <TableRow className="text-center">
                      <TableHead className="w-[40px]">No.</TableHead>
                      <TableHead className="text-center">Email</TableHead>
                      <TableHead className="text-center">First Name</TableHead>
                      <TableHead className="text-center">Last Name</TableHead>
                      <TableHead className="text-center">Photo</TableHead>
                      <TableHead className="text-center">Product ID</TableHead>
                      <TableHead className="text-center">Location</TableHead>
                      <TableHead className="text-center">
                        Premium Paid
                      </TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="w-full">
                    {items &&
                      items.map((item, index) => {
                        const { billing_records, customer_billing_portal } =
                          item;
                        return (
                          <React.Fragment key={index}>
                            <TableRow className="w-full">
                              <TableCell className="font-medium w-[40px]">
                                {index + 1}
                              </TableCell>
                              <TableCell className="text-center">
                                {customer_billing_portal?.email}
                              </TableCell>
                              <TableCell className="text-center">
                                {customer_billing_portal?.first_name}
                              </TableCell>
                              <TableCell className="text-center">
                                {customer_billing_portal?.last_name}
                              </TableCell>
                              <TableCell className="text-center">
                                {customer_billing_portal?.photo}
                              </TableCell>
                              <TableCell className="text-center">
                                {billing_records?.product_id}
                              </TableCell>

                              {editItem.billingId === billing_records?.id ? (
                                <TableCell className="text-center">
                                  <Input
                                    placeholder="location"
                                    onChange={(e) =>
                                      setEditedItem((prev) => ({
                                        ...prev,
                                        location: e.target.value,
                                      }))
                                    }
                                    defaultValue={
                                      editedItem.location
                                        ? editedItem.location
                                        : ""
                                    }
                                  />
                                </TableCell>
                              ) : (
                                <TableCell className="text-center">
                                  {billing_records?.location}
                                </TableCell>
                              )}

                              {editItem.billingId === billing_records?.id ? (
                                <TableCell className="text-center">
                                  <Input
                                    placeholder="00.00"
                                    onChange={(e) =>
                                      setEditedItem((prev) => ({
                                        ...prev,
                                        premiumPaid: parseFloat(e.target.value),
                                      }))
                                    }
                                    defaultValue={
                                      editedItem.premiumPaid
                                        ? editedItem.premiumPaid
                                        : 0
                                    }
                                  />
                                </TableCell>
                              ) : (
                                <TableCell className="text-center">
                                  {billing_records?.premium_paid}
                                </TableCell>
                              )}

                              <TableCell className="text-center">
                                <div className="flex items-center justify-center gap-3">
                                  {editItem.billingId ===
                                  billing_records?.id ? (
                                    <>
                                      <span
                                        onClick={() => handleUpdate(editedItem)}
                                      >
                                        <BookCheck className="cursor-pointer text-green-500" />
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <span
                                        onClick={() =>
                                          setEditItem({
                                            billingId: billing_records?.id,
                                            productId:
                                              billing_records.product_id,
                                          })
                                        }
                                      >
                                        <Pencil className="cursor-pointer text-orange-500" />
                                      </span>
                                    </>
                                  )}
                                  <span
                                    onClick={() => {
                                      setOpenModalDelete(true);
                                      setSelectedDeleteId(billing_records?.product_id);
                                    }}
                                  >
                                    <Trash2 className="cursor-pointer text-red-500" />
                                  </span>
                                </div>
                              </TableCell>
                            </TableRow>
                          </React.Fragment>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            )}

            {!isAdmin && (
              <div className="p-5 w-full flex items-center justify-center">
                <Table className="">
                  <TableCaption>A List Billing Data.</TableCaption>
                  <TableHeader className="w-full text-center">
                    <TableRow className="text-center">
                      <TableHead className="w-[40px]">No.</TableHead>
                      <TableHead className="text-center">Email</TableHead>
                      <TableHead className="text-center">First Name</TableHead>
                      <TableHead className="text-center">Last Name</TableHead>
                      <TableHead className="text-center">Photo</TableHead>
                      <TableHead className="text-center">Product ID</TableHead>
                      <TableHead className="text-center">Location</TableHead>
                      <TableHead className="text-center">
                        Premium Paid
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="w-full">
                    {items &&
                      items.map((item, index) => {
                        const { billing_records, customer_billing_portal } =
                          item;
                        return (
                          <React.Fragment key={index}>
                            <TableRow className="w-full">
                              <TableCell className="font-medium w-[40px]">
                                {index + 1}
                              </TableCell>
                              <TableCell className="text-center">
                                {customer_billing_portal.email}
                              </TableCell>
                              <TableCell className="text-center">
                                {customer_billing_portal.first_name}
                              </TableCell>
                              <TableCell className="text-center">
                                {customer_billing_portal.last_name}
                              </TableCell>
                              <TableCell className="text-center">
                                {customer_billing_portal.photo}
                              </TableCell>
                              <TableCell className="text-center">
                                {billing_records.product_id}
                              </TableCell>
                              <TableCell className="text-center">
                                {billing_records.location}
                              </TableCell>
                              <TableCell className="text-center">
                                {billing_records.premium_paid}
                              </TableCell>
                            </TableRow>
                          </React.Fragment>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            )}

            {openModalDelete && (
              <AlertDialog
                open={openModalDelete}
                onOpenChange={setOpenModalDelete}
              >
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undo. This will proceed to Delete
                      Item.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    {selectedDeleteId && (
                      <AlertDialogAction
                        onClick={() => {
                          handleDelete(selectedDeleteId);
                        }}
                      >
                        Continue
                      </AlertDialogAction>
                    )}
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Content;
