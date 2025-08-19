import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ModalHistoryDetail({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogContent className="w-1/2">
          <DialogHeader>
            <DialogTitle>Chi Tiết Đơn nhập kho</DialogTitle>
            <DialogDescription className="hidden">
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <h1 className=" font-semibold">Thông tin đơn nhập </h1>
            <div className="grid gap-4 grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name-1">Mã đơn nhập</Label>
                <Input
                  id="id"
                  name="id"
                  className="cursor-not-allowed"
                  disabled={true}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username-1">Ngày nhập kho</Label>
                <Input
                  id="day"
                  name="day"
                  className="cursor-not-allowed"
                  disabled={true}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="note">Ghi chú</Label>
                <Input id="note" name="note" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
