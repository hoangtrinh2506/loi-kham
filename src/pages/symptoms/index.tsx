import { useAtom, useAtomValue } from "jotai";
import { useNavigate } from "react-router-dom";
import Screen from "@/components/flow/screen";
import BackLink from "@/components/flow/back-link";
import { AlertIcon } from "@/components/flow/icons";
import TransitionLink from "@/components/transition-link";
import { areasState, clinicSearchFormState } from "@/state";
import { hasEmergencySigns } from "@/utils/emergency";

const FIELD_CLASS =
  "w-full rounded-xl border border-field bg-white text-lg text-foreground";

function SymptomsPage() {
  const areas = useAtomValue(areasState);
  const [form, setForm] = useAtom(clinicSearchFormState);
  const navigate = useNavigate();

  const submit = () => {
    navigate(hasEmergencySigns(form.description) ? "/emergency" : "/results", {
      viewTransition: true,
    });
  };

  return (
    <Screen className="gap-5">
      <div className="flex flex-col gap-2">
        <BackLink to="/" label="Trang chủ" />
        <h1 className="text-[26px] leading-tight font-bold">Tìm phòng khám</h1>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="symptoms" className="text-base font-semibold">
          Bạn đang có triệu chứng gì?
        </label>
        <textarea
          id="symptoms"
          rows={4}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Ví dụ: đau họng 3 ngày, hơi sốt"
          className={`${FIELD_CLASS} p-3.5 leading-normal resize-none`}
        />
        <p className="text-2xs leading-normal text-muted">
          Mô tả ngắn gọn. Nội dung này không được lưu lại.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="area" className="text-base font-semibold">
          Khu vực
        </label>
        <select
          id="area"
          value={form.area}
          onChange={(e) => setForm({ ...form, area: e.target.value })}
          className={`${FIELD_CLASS} min-h-[52px] px-3.5`}
        >
          <option value="">Chọn khu vực</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      <TransitionLink
        to="/emergency"
        className="flex items-start gap-3 rounded-[14px] border border-danger-line bg-danger-soft px-4 py-3.5 text-danger-text"
      >
        <AlertIcon className="mt-px" />
        <span className="text-sm leading-normal font-semibold">
          Có dấu hiệu nguy hiểm như đau ngực, khó thở, co giật, ngất? Gọi 115
          ngay, không chờ đặt lịch.
        </span>
      </TransitionLink>

      <div className="mt-auto flex flex-col gap-3">
        <button
          type="button"
          onClick={submit}
          className="flex min-h-[52px] items-center justify-center rounded-[14px] bg-primary text-lg font-bold text-white"
        >
          Tìm phòng khám
        </button>
        <p className="text-center text-2xs leading-normal text-muted">
          Ứng dụng chỉ gợi ý chuyên khoa, không chẩn đoán bệnh.
        </p>
      </div>
    </Screen>
  );
}

export default SymptomsPage;
