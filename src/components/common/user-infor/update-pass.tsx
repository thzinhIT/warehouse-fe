import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { LoadingBtn } from "../loading-page";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import UserKeys from "@/lib/networking/client/user/endpoint";
import { UpdatePass } from "@/lib/networking/client/user/service";

export type TUpdatePass = {
  oldPassword: string;
  newPassword: string;
};

export function UpdatePasswordDialog({
  open,
  setOpen,
}: {
  readonly open: boolean;
  readonly setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const ref = useRef<TUpdatePass>({ oldPassword: "", newPassword: "" });

  const { mutate: updatePass, isPending: updatePassPending } = useMutation({
    mutationKey: [UserKeys.UPDATE_PASS],
    mutationFn: UpdatePass,
    onSuccess: () => {
      toast.success("Thay đổi mật khẩu thành công");
    },
  });

  const handleUpdatePass = () => {
    // if (!ref.current.oldPassword || !ref.current.newPassword) {
    //   toast.error("Vui lòng nhập đầy đủ mật khẩu!");
    //   return;
    // }
    toast.success("Đang cập nhật mật khẩu...");
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      document.body.style.pointerEvents = "auto"; // reset lại
      console.log("cũng cũng á ", open);
    }
  }, [open]);

  useEffect(() => {
    console.log("open", open);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cập nhật mật khẩu</DialogTitle>
          <DialogDescription>
            Vui lòng nhập mật khẩu cũ và mật khẩu mới để tiếp tục.
          </DialogDescription>
        </DialogHeader>

        {/* Form fields */}
        <div className="grid gap-4 py-2">
          {/* Old password */}
          <div className="grid gap-2 relative">
            <Label htmlFor="oldPass">Mật khẩu cũ</Label>
            <Input
              id="oldPass"
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu cũ"
              onChange={(e) => {
                ref.current.oldPassword = e.target.value;
              }}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute bottom-2 right-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* New password */}
          <div className="grid gap-2 relative">
            <Label htmlFor="newPass">Mật khẩu mới</Label>
            <Input
              id="newPass"
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu mới"
              onChange={(e) => {
                ref.current.newPassword = e.target.value;
              }}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute bottom-2 right-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Hủy</Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleUpdatePass}
            disabled={updatePassPending}
          >
            {updatePassPending && <LoadingBtn />}
            Cập nhật
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
