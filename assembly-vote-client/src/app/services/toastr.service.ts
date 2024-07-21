import notification from "toastr";

interface IToastr {
  message: string;
  title?: string;
}

type IToastrType = "success" | "info" | "warning" | "error";

export const toastr = (message: IToastr, type: IToastrType) => {
  notification[type](message.message, message.title, {
    closeButton: true,
    progressBar: true,
    timeOut: 3000,
  });
};
