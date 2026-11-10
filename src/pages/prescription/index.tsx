import { useState } from "react";
import { useAtomValue } from "jotai";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Screen from "@/components/flow/screen";
import BackLink from "@/components/flow/back-link";
import { AlertIcon } from "@/components/flow/icons";
import { prescriptionItemsState } from "@/state";
import { notAvailableYet } from "@/utils/actions";

function PrescriptionPage() {
  const items = useAtomValue(prescriptionItemsState);
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();

  const save = () => {
    toast.success("Đã lưu lịch uống");
    navigate("/medication", { viewTransition: true });
  };

  return (
    <Screen className="gap-4">
      <div className="flex flex-col gap-1">
        <BackLink to="/medication" label="Lịch uống thuốc" />
        <h1 className="text-[26px] leading-tight font-bold">
          Xác nhận toa thuốc
        </h1>
      </div>

      <div className="flex items-start gap-2.5 rounded-xl bg-warning-soft px-3.5 py-3 text-warning-ink">
        <AlertIcon size={20} className="mt-px" />
        <span className="text-sm leading-normal font-semibold">
          Kết quả đọc tự động có thể sai. Hãy đối chiếu với toa gốc và sửa
          trước khi lưu.
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex h-[140px] items-center justify-center rounded-[14px] border-[1.5px] border-dashed border-[#9FB3AE] bg-disabled-bg text-sm font-semibold text-subtle">
          Ảnh toa thuốc để đối chiếu
        </div>
        <span className="text-2xs text-muted">
          Ảnh được xoá ngay sau khi đọc xong.
        </span>
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col gap-2.5 rounded-[14px] border border-line bg-white px-4 py-3.5"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-lg font-bold">{item.name}</span>
            <button
              type="button"
              onClick={() => notAvailableYet()}
              className="min-h-11 rounded-[10px] border-[1.5px] border-primary bg-white px-3.5 text-sm font-bold text-primary-dark"
            >
              Sửa
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              ["Liều", item.dose],
              ["Số lần/ngày", `${item.timesPerDay} lần`],
              ["Số ngày", `${item.days} ngày`],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-2xs text-muted">{label}</span>
                <span className="text-base font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <label className="flex min-h-[52px] items-start gap-3 rounded-xl border-[1.5px] border-primary bg-white px-3.5 py-3">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          className="m-0 h-6 w-6 flex-none accent-primary"
        />
        <span className="text-sm leading-normal font-semibold">
          Tôi đã đối chiếu với toa gốc và xác nhận thông tin đúng.
        </span>
      </label>

      <div className="mt-auto flex flex-col gap-2">
        <button
          type="button"
          disabled={!confirmed}
          onClick={save}
          className={`flex min-h-[52px] w-full items-center justify-center rounded-[14px] text-lg font-bold ${confirmed ? "bg-primary text-white" : "bg-disabled-bg text-disabled"}`}
        >
          Lưu lịch uống
        </button>
        <p className="text-center text-2xs leading-normal text-muted">
          Cần xác nhận mới lưu được. Toa viết tay dễ đọc sai, bạn có thể nhập
          tay.
        </p>
      </div>
    </Screen>
  );
}

export default PrescriptionPage;
