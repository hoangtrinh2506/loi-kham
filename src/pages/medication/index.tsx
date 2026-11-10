import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import Screen from "@/components/flow/screen";
import BackLink from "@/components/flow/back-link";
import { CameraIcon, LockIcon } from "@/components/flow/icons";
import TransitionLink from "@/components/transition-link";
import { medicationScheduleState } from "@/state";
import { notAvailableYet } from "@/utils/actions";

function MedicationPage() {
  const sessions = useAtomValue(medicationScheduleState);
  // Ticks stay on the device only, one record per day
  const storageKey = `loikham.medication.taken.${new Date().toDateString()}`;
  const [taken, setTaken] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) ?? "{}");
    } catch {
      return {};
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(taken));
    } catch {
      // Storage can be unavailable (private mode); ticks then last for the session only
    }
  }, [taken]);
  const today = new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
  });

  return (
    <Screen className="gap-4">
      <div className="flex flex-col gap-1">
        <BackLink to="/" label="Trang chủ" />
        <h1 className="text-[26px] leading-tight font-bold">Lịch uống thuốc</h1>
        <div className="text-sm text-muted first-letter:uppercase">
          Hôm nay · {today}
        </div>
      </div>

      <div className="flex flex-col gap-3.5">
        {sessions.map((session) => (
          <div key={session.id} className="flex flex-col gap-1.5">
            <span className="text-2xs font-bold uppercase tracking-wide text-primary-dark">
              {session.label} · {session.time}
            </span>
            {session.doses.map((dose) => {
              const key = `${session.id}-${dose.id}`;
              return (
                <label
                  key={key}
                  className="flex min-h-[52px] items-center gap-3 rounded-xl border border-line bg-white px-3.5 py-1.5"
                >
                  <input
                    type="checkbox"
                    checked={!!taken[key]}
                    onChange={(e) =>
                      setTaken({ ...taken, [key]: e.target.checked })
                    }
                    className="h-6 w-6 flex-none accent-primary"
                  />
                  <span
                    className={`flex flex-col ${taken[key] ? "line-through text-muted" : ""}`}
                  >
                    <span className="text-base font-semibold">
                      {dose.name} · {dose.dose}
                    </span>
                    <span className="text-2xs text-muted">{dose.note}</span>
                  </span>
                </label>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex items-start gap-2.5 rounded-xl bg-highlight px-3.5 py-3 text-primary-ink">
        <LockIcon size={18} className="mt-0.5" />
        <span className="text-xs leading-normal">
          Lịch được lưu trên điện thoại của bạn, không gửi lên máy chủ.
        </span>
      </div>

      <div className="mt-auto flex flex-col gap-2.5">
        <TransitionLink
          to="/prescription"
          className="flex min-h-[52px] items-center justify-center gap-2 rounded-[14px] bg-primary text-lg font-bold text-white"
        >
          <CameraIcon size={20} />
          Quét toa thuốc
        </TransitionLink>
        <button
          type="button"
          onClick={() => notAvailableYet()}
          className="flex min-h-12 items-center justify-center rounded-[14px] border-[1.5px] border-primary bg-white text-base font-bold text-primary-dark"
        >
          Thêm thuốc thủ công
        </button>
        <p className="mt-0.5 text-center text-2xs leading-normal text-muted">
          Luôn làm theo chỉ định của bác sĩ hoặc dược sĩ.
        </p>
      </div>
    </Screen>
  );
}

export default MedicationPage;
