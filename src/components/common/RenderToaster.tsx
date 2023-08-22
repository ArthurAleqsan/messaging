import { createPortal } from "react-dom";

import Views from "../Views";

const RenderToaster = (toaster: any, toasterClassNames: string) => {
  if (!toaster.view) return "";
  const onClose = () => {
    // dispatch(closeToaster(toaster.id));
    if (
      !!toaster.id &&
      toaster.id.toLowerCase() !== toaster.view.toLowerCase() &&
      (toaster.persistent === undefined || toaster.persistent)
    ) {
      // TO DO set unread status
      // dispatch(requestReadMessage(toaster.id));
    }
  };
  const View = Views[toaster.view];

  const style = {
    top: `${(toaster?.params?.data?.inGame
        ? toaster?.params?.data?.x ?? 60
        : toaster?.params?.data?.x ?? 95) + 8
      }px`,
  };

  return createPortal(
    <>
      {!!View && (
        <div
          className={`${toasterClassNames}
                ${toaster.view} ${toaster?.params?.data?.inGame ? "in-game" : ""
            }`}
          style={style}
          key={toaster.id}
        >
          <View key={toaster.id} onClose={onClose} {...toaster.params} />
        </div>
      )}
    </>,
    (document.getElementById("toaster-root") as any)
  );
};

export default RenderToaster;