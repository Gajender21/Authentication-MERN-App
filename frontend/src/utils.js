import { toast } from "react-toastify";

function handleSuccess(msg) {
  toast.success(msg, { position: "top-right" });
}
function handleError(msg) {
  toast.error(msg, { position: "top-right" });
}

export { handleSuccess, handleError };
