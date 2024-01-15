"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Rave } from "@/types";
import { Button } from "./ui/button";
import { Icons } from "./icons";

import { ravePostSchema } from "@/validations/rave";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
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
import { useState } from "react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "./ui/textarea";
import StarRatingForm from "./star-rating-input";
import { updateRaveAction } from "@/app/actions/actions";

type FormData = z.infer<typeof ravePostSchema>;

interface UpdateRaveProps {
  rave: Rave;
}

const UpdateRave = ({ rave }: UpdateRaveProps) => {
  const [isCandy, setIsCandy] = useState(rave.candy ? true : false);
  const [rating, setRating] = useState(rave.rank);

  const adjustedDate = addMinutes(rave.date, rave.date.getTimezoneOffset());

  const form = useForm<FormData>({
    resolver: zodResolver(ravePostSchema),
    defaultValues: {
      date: adjustedDate,
      djs: rave.djs,
      ayn: rave.ayn,
      name: rave.name,
      location: rave.location,
      genre: rave.genre,
      candy: rave.candy ? rave.candy : "",
      quantity: rave.quantity ? rave.quantity : 0,
      anecdotes: rave.anecdotes ? rave.anecdotes : "",
    },
  });

  async function onSubmit(data: FormData) {
    const { candy, quantity, anecdotes, ...dataWithoutOptionalFields } = data;
    const payload = {
      ...(data.candy
        ? { candy: data.candy, quantity: data.quantity }
        : { candy: "", quantity: undefined }),
      ...(data.anecdotes ? { anecdotes: data.anecdotes } : { anecdotes: "" }),
      ...dataWithoutOptionalFields,
      date: convertToDBDate(data.date),
      rank: rating,
    };
    console.log(payload);
    try {
      await updateRaveAction(rave.id, payload);
      return toast.success(`Rave "${data.name}" updated successfully.`);
    } catch (err) {
      return toast.error("Something went wrong.");
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Icons.edit strokeWidth="2.5" className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="my-4">
          <SheetTitle>Update existing rave</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-4xl"
          >
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col basis-1/2 z-50">
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
                  <FormItem className="basis-1/2">
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
                      <Input placeholder="Sloterpark - Amsterdam" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
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

              <FormField
                control={form.control}
                name="anecdotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Anecdotes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="The night we met ARIELO"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SheetFooter className="my-2">
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default UpdateRave;
