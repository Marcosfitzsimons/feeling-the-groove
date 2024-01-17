"use client";

import { Rave } from "@/types";
import { Button } from "./ui/button";
import { Icons } from "./icons";

import { raveUpdateSchema } from "@/validations/rave";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { addMinutes, format } from "date-fns";
import { cn, convertToDBDate } from "@/lib/utils";
import React, { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import StarRatingForm from "./star-rating-input";
import { updateRaveAction } from "@/app/actions/actions";

type FormData = z.infer<typeof raveUpdateSchema>;

interface UpdateRaveProps {
  rave: Rave;
}

const UpdateRave = ({ rave }: UpdateRaveProps) => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isCandy, setIsCandy] = useState(rave.candy ? true : false);
  const [rating, setRating] = useState(rave.rank);

  const correctDate = (date: Date) => {
    const adjustedDate = addMinutes(date, date.getTimezoneOffset());
    return adjustedDate;
  };

  const form = useForm<FormData>({
    resolver: zodResolver(raveUpdateSchema),
    defaultValues: {
      date: correctDate(rave.date),
      djs: rave.djs,
      ayn: rave.ayn,
      name: rave.name,
      location: rave.location,
      genre: rave.genre,
      candy: rave.candy ? rave.candy : "",
      quantity: rave.quantity ? rave.quantity : 0,
    },
  });

  async function onSubmit(data: FormData) {
    const { candy, quantity, ...dataWithoutOptionalFields } = data;
    const payload = {
      ...(data.candy
        ? { candy: data.candy, quantity: data.quantity }
        : { candy: "", quantity: undefined }),
      ...dataWithoutOptionalFields,
      date: convertToDBDate(data.date),
      rank: rating,
    };

    try {
      await updateRaveAction(rave.id, payload);
      setOpen(false);
      return toast.success(`Rave "${data.name}" updated successfully.`);
    } catch (err) {
      setOpen(false);
      return toast.error("Something went wrong.");
    }
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Icons.edit strokeWidth="2.5" className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader className="my-4">
            <DialogTitle className="text-center">
              Update existing rave
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full max-w-4xl"
            >
              <div className="flex gap-2">
                <div className="flex flex-col gap-2 basis-1/2">
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col basis-2/3">
                          <FormLabel className="flex items-center">
                            Date of rave
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <Icons.calendar className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ayn"
                      render={({ field }) => (
                        <FormItem className="basis-1/3">
                          <FormLabel className="flex items-center gap-1">
                            Ayn
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="djs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Djs</FormLabel>
                        <FormControl>
                          <Input placeholder="Nick Warren" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Loveland" {...field} />
                        </FormControl>
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
                          <Input
                            placeholder="Sloterpark - Amsterdam"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2 basis-1/2">
                  <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          Genre
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Progressive" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="airplane-mode"
                      checked={isCandy}
                      onCheckedChange={() => setIsCandy((prev) => !prev)}
                    />
                    <Label htmlFor="airplane-mode">Candy</Label>
                  </div>

                  {isCandy && (
                    <div className="flex gap-2">
                      <FormField
                        control={form.control}
                        name="candy"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Candy</FormLabel>
                            <FormControl>
                              <Input placeholder="Love" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <Label>Rank</Label>
                    <StarRatingForm rating={rating} setRating={setRating} />
                  </div>
                </div>
              </div>
              <DialogFooter className="my-2">
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>
          <Icons.edit strokeWidth="2.5" className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </DrawerTrigger>
      <DrawerContent className="px-2">
        <DrawerHeader>
          <DrawerTitle>Update existing rave</DrawerTitle>
        </DrawerHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-4xl"
          >
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col basis-2/3 z-50">
                      <FormLabel className="flex items-center">
                        Date of rave
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <Icons.calendar className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ayn"
                  render={({ field }) => (
                    <FormItem className="basis-1/3">
                      <FormLabel className="flex items-center gap-1">
                        Ayn
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="djs"
                  render={({ field }) => (
                    <FormItem className="basis-1/2">
                      <FormLabel>Djs</FormLabel>
                      <FormControl>
                        <Input placeholder="Nick Warren" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <FormItem className="basis-1/2">
                      <FormLabel>Genre</FormLabel>
                      <FormControl>
                        <Input placeholder="Progressive" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="basis-1/2">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Loveland" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="basis-1/2">
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Sloterpark - Amsterdam"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="airplane-mode"
                  checked={isCandy}
                  onCheckedChange={() => setIsCandy((prev) => !prev)}
                />
                <Label htmlFor="airplane-mode">Candy</Label>
              </div>

              {isCandy && (
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="candy"
                    render={({ field }) => (
                      <FormItem className="basis-2/3">
                        <FormLabel>Candy</FormLabel>
                        <FormControl>
                          <Input placeholder="Love" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem className="basis-1/3">
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <div className="flex flex-col gap-2">
                <Label>Rank</Label>
                <StarRatingForm rating={rating} setRating={setRating} />
              </div>
            </div>
            <DrawerFooter className="px-0 my-2">
              <Button type="submit">Save changes</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default UpdateRave;
