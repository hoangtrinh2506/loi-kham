import Screen from "@/components/flow/screen";
import BackLink from "@/components/flow/back-link";
import { AlertIcon, MapPinIcon, PhoneIcon } from "@/components/flow/icons";
import {
  callPhone,
  EMERGENCY_NUMBER,
  mapsSearchUrl,
  openUrl,
} from "@/utils/actions";

function EmergencyPage() {
  return (
    <Screen tone="danger" className="gap-5">
      <BackLink label="Quay lại" className="text-danger-dark" />

      <div className="flex flex-col gap-3 px-1 pt-2">
        <span className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-danger text-white">
          <AlertIcon size={36} />
        </span>
        <h1 className="text-[28px] leading-tight font-bold text-danger-dark">
          Có dấu hiệu nguy hiểm
        </h1>
        <p className="text-[17px] leading-normal font-medium">
          Đừng chờ đặt lịch khám. Hãy gọi cấp cứu ngay.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => callPhone(EMERGENCY_NUMBER)}
          className="flex min-h-[68px] items-center justify-center gap-2.5 rounded-2xl bg-danger text-[24px] font-bold text-white"
        >
          <PhoneIcon size={26} />
          Gọi {EMERGENCY_NUMBER}
        </button>
        <button
          type="button"
          onClick={() => openUrl(mapsSearchUrl("bệnh viện cấp cứu gần nhất"))}
          className="flex min-h-[52px] items-center justify-center gap-2 rounded-[14px] border-[1.5px] border-danger bg-white text-lg font-bold text-danger-text"
        >
          <MapPinIcon size={20} />
          Tìm cơ sở cấp cứu gần nhất
        </button>
      </div>

      <div className="flex flex-col gap-1.5 rounded-[14px] border border-danger-line bg-white px-4 py-3.5">
        <span className="text-xs font-bold text-danger-dark">
          Vì sao bạn thấy màn hình này?
        </span>
        <p className="text-sm leading-normal">
          Mô tả của bạn có dấu hiệu như đau ngực, khó thở, co giật, ngất, liệt
          hoặc méo miệng đột ngột, chảy máu nhiều.
        </p>
      </div>

      <p className="mt-auto px-1 text-2xs leading-normal text-danger-muted">
        Ứng dụng không thay thế dịch vụ cấp cứu và không chẩn đoán bệnh.
      </p>
    </Screen>
  );
}

export default EmergencyPage;
