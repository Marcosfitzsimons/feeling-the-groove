"use client";

import React from "react";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateRaveMemoriesAction } from "@/app/actions/actions";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import Image from "next/image";

interface AddRaveMemoriesProps {
  raveId: string;
}

type FormData = {
  memories: string;
};

const AddRaveMemories = ({ raveId }: AddRaveMemoriesProps) => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const form = useForm({
    defaultValues: {
      memories: "",
    },
  });

  async function onSubmit(data: FormData) {
    if (data.memories.length < 3) {
      return toast.error("Memories must be at least 3 characters.");
    }
    const payload = {
      memories: data.memories ? data.memories : "",
    };

    try {
      await updateRaveMemoriesAction(raveId, payload);
      setOpen(false);
      return toast.success(`Memories added successfully.`);
    } catch (err) {
      setOpen(false);
      return toast.error("Something went wrong.");
    }
  }

  return (
    <div className="">
      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="h-6 text-xs">
              Add memories
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">Add memories...</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full max-w-4xl"
              >
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
                <DialogFooter className="my-2">
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button size="sm" variant="outline" className="h-6 text-xs">
              Add memories
            </Button>
          </DrawerTrigger>
          <DrawerContent className="px-2">
            <DrawerHeader>
              <DrawerTitle>Add memories...</DrawerTitle>
            </DrawerHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full max-w-4xl"
              >
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
      )}
    </div>
  );
};

export default AddRaveMemories;
