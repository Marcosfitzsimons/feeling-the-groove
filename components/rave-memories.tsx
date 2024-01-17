"use client";

import React from "react";
import Image from "next/image";
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

interface RaveMemoriesProps {
  memories: string;
  raveId: string;
}

type FormData = {
  memories: string;
};

const RaveMemories = ({ memories, raveId }: RaveMemoriesProps) => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const form = useForm({
    defaultValues: {
      memories: memories,
    },
  });

  async function onSubmit(data: FormData) {
    const payload = {
      memories: data.memories ? data.memories : "",
    };

    try {
      await updateRaveMemoriesAction(raveId, payload);
      setOpen(false);
      return toast.success(`Memories updated successfully.`);
    } catch (err) {
      setOpen(false);
      return toast.error("Something went wrong.");
    }
  }

  return (
    <div className="">
      <div className="flex items-centar gap-1">
        <p className="font-semibold">Memories</p>
        {isDesktop ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="h-6 text-xs">
                <Icons.edit className="w-3.5 h-3.5 mr-2" />
                Edit memories
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center">
                  Update memories...
                </DialogTitle>
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
                <Icons.edit className="w-3.5 h-3.5 mr-2" />
                Edit memories
              </Button>
            </DrawerTrigger>
            <DrawerContent className="px-2">
              <DrawerHeader>
                <DrawerTitle>Update memories...</DrawerTitle>
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
      <div className="p-2 max-w-md flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <Image src="/pin.png" alt="pin" width={20} height={20} />
          <p className="text-muted-foreground text-xs italic">
            Moments to remember...
          </p>
        </div>
        <p className="px-4">{memories}</p>
      </div>
    </div>
  );
};

export default RaveMemories;
