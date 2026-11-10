import { useAtomValue } from "jotai";
import Screen from "@/components/flow/screen";
import BackLink from "@/components/flow/back-link";
import { SearchIcon } from "@/components/flow/icons";
import { clinicSearchFormState, clinicSuggestionState } from "@/state";
import { mapsSearchUrl, openUrl } from "@/utils/actions";
import ClinicCard from "./clinic-card";

function ResultsPage() {
  const { specialty, clinics } = useAtomValue(clinicSuggestionState);
  const { area } = useAtomValue(clinicSearchFormState);
  const matches = area ? clinics.filter((c) => c.area === area) : clinics;

  const searchMore = () =>
    openUrl(mapsSearchUrl(`Phòng khám ${specialty} ${area || "gần đây"}`));

  return (
    <Screen className="gap-4">
      <div className="flex flex-col gap-2">
        <BackLink to="/symptoms" label="Tìm lại" />
        <h1 className="text-[26px] leading-tight font-bold">Gợi ý cho bạn</h1>
      </div>

      <div className="flex flex-col gap-1 rounded-2xl bg-highlight p-4">
        <span className="text-2xs font-bold tracking-wide text-primary-dark">
          CHUYÊN KHOA GỢI Ý
        </span>
        <span className="text-[20px] leading-7 font-bold">{specialty}</span>
        <span className="text-2xs leading-normal text-subtle">
          AI gợi ý từ mô tả của bạn, chưa phải chẩn đoán.
        </span>
      </div>

      {matches.length === 0 && (
        <div className="flex flex-col gap-1 rounded-2xl border border-dashed border-field bg-white p-4">
          <span className="text-base font-semibold">
            Chưa có cơ sở {specialty} tại {area} trong danh sách
          </span>
          <span className="text-sm leading-normal text-subtle">
            Bạn có thể tìm thêm trên Google Maps hoặc chọn khu vực khác.
          </span>
        </div>
      )}
      {matches.map((clinic) => (
        <ClinicCard key={clinic.id} clinic={clinic} />
      ))}

      <div className="flex flex-col gap-2 p-1">
        <span className="text-sm font-semibold">Không thấy cơ sở phù hợp?</span>
        <button
          type="button"
          onClick={searchMore}
          className="flex min-h-12 items-center justify-center gap-2 rounded-xl border-[1.5px] border-primary text-sm font-bold text-primary-dark"
        >
          <SearchIcon size={18} />
          Tìm thêm trên Google Maps
        </button>
      </div>

      <p className="mt-auto px-1 text-2xs leading-normal text-muted">
        Thông tin chỉ mang tính tham khảo, không thay thế tư vấn của bác sĩ.
        Giờ làm việc và kênh đặt lịch có thể thay đổi, hãy xác nhận lại với cơ
        sở.
      </p>
    </Screen>
  );
}

export default ResultsPage;
