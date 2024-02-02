"use client";

import { ravePostSchema } from "@/lib/validations/rave";
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
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Icons } from "./icons";
import { differenceInDays, format } from "date-fns";
import { cn, convertToDBDate } from "@/lib/utils";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "./ui/textarea";
import StarRatingForm from "./star-rating-input";
import { User } from "next-auth";
import { createRaveAction } from "@/app/actions/actions";
import { useRouter } from "next/navigation";

type FormData = z.infer<typeof ravePostSchema>;

interface NewRaveFormProps {
  nearestPastDate: Date | null;
  user: Pick<User, "id">;
}

const NewRaveForm = ({ nearestPastDate, user }: NewRaveFormProps) => {
  const [isCandy, setIsCandy] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rating, setRating] = useState(3);

  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(ravePostSchema),
    defaultValues: {
      date: undefined,
      djs: "",
      ayn: 0,
      name: "",
      location: "",
      genre: "",
      candy: "",
      quantity: 1,
      memories: "",
    },
  });

  async function onSubmit(data: FormData) {
    setIsSubmitted(true);

    const { candy, quantity, memories, ...dataWithoutOptionalFields } = data;

    const payload = {
      ...(data.candy && { candy: data.candy, quantity: data.quantity }),
      ...(data.memories && { memories: data.memories }),
      ...dataWithoutOptionalFields,
      date: convertToDBDate(data.date),
      rank: rating,
      author: { connect: { id: user.id } },
    };

    try {
      await createRaveAction(payload);
      router.push("/raves");
      return toast.success(`Rave "${data.name}" created successfully.`);
    } catch (err) {
      console.log(err);
      setIsSubmitted(false);
      return toast.error("Something went wrong.");
    }
  }

  const calculateAyn = (dateSelected: Date, nearestPastDate: Date | null) => {
    if (dateSelected && nearestPastDate) {
      if (nearestPastDate > dateSelected) {
        form.setValue("ayn", 0);
      } else {
        const difference = differenceInDays(dateSelected, nearestPastDate);
        form.setValue("ayn", difference);
      }
    }
    return null;
  };

  let dateSelected = form.getValues("date");

  const handleDateSelect = (date: Date | undefined) => {
    // Update the form value when the date is selected
    form.setValue("date", date as Date);
    // Calculate Ayn based on the selected date
    dateSelected = form.getValues("date");
    calculateAyn(dateSelected, nearestPastDate);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-4xl">
        <div className="flex flex-col gap-2 md:flex-row md:gap-4">
          <div className="flex flex-col gap-2 md:basis-1/2">
            <div className="flex gap-2 mt-1">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="basis-2/3">
                    <FormLabel
                      className={`${
                        dateSelected &&
                        nearestPastDate &&
                        nearestPastDate < dateSelected
                          ? "h-[24px]"
                          : ""
                      } flex items-center`}
                    >
                      Date of rave
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal w-full",
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
                          onSelect={handleDateSelect}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
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
                      {dateSelected &&
                      nearestPastDate &&
                      nearestPastDate < dateSelected ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Icons.info className="w-3.5 aspect-square" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">
                                This value is calculated based on nearest
                                previous rave
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        ""
                      )}
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
          </div>
          <div className="flex flex-col gap-2 md:basis-1/2">
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
                      <FormDescription className="text-xs">
                        Any candy this time?{" "}
                        <span className="relative bottom-0.5">👀</span>
                      </FormDescription>
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

            <FormField
              control={form.control}
              name="memories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Memories</FormLabel>
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

            <Button
              type="submit"
              className="self-end mt-auto"
              disabled={isSubmitted}
            >
              {isSubmitted ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.party className="mr-2 h-4 w-4" />
              )}{" "}
              {isSubmitted ? "Creating..." : "Create"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default NewRaveForm;
