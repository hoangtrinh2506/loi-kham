import {
  DirectionsIcon,
  GlobeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/flow/icons";
import { Clinic } from "@/types";
import {
  callPhone,
  mapsDirectionsUrl,
  mapsSearchUrl,
  notAvailableYet,
  openUrl,
} from "@/utils/actions";

const BOOKING_BUTTON_CLASS =
  "flex min-h-12 items-center justify-center gap-1.5 rounded-xl text-sm font-bold";
const MAP_BUTTON_CLASS =
  "flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-background text-sm font-semibold text-foreground";

export default function ClinicCard({ clinic }: { clinic: Clinic }) {
  const { verified } = clinic;
  const location = `${clinic.name}, ${clinic.address}`;

  const call = () =>
    clinic.phone
      ? callPhone(clinic.phone)
      : notAvailableYet("Dữ liệu minh hoạ: chưa có số điện thoại");
  const openWebsite = () =>
    clinic.website
      ? openUrl(clinic.website)
      : notAvailableYet("Dữ liệu minh hoạ: chưa có website");

  return (
    <div className="flex flex-col gap-2.5 rounded-2xl border border-line bg-white p-4">
      {verified ? (
        <span className="self-start rounded-full bg-success-soft px-2.5 py-1 text-2xs font-bold text-success">
          Đã kiểm tra · {clinic.verifiedAt}
        </span>
      ) : (
        <span className="self-start rounded-full bg-warning-soft px-2.5 py-1 text-2xs font-bold text-warning-text">
          Chưa kiểm chứng
        </span>
      )}
      <h2 className="text-xl font-bold">{clinic.name}</h2>
      <div className="text-sm leading-normal text-subtle">{clinic.address}</div>
      <div className="text-sm leading-normal text-subtle">
        {verified ? "Giờ làm việc" : "Giờ làm việc (AI gợi ý)"}: {clinic.hours}
      </div>
      {!verified && (
        <div className="rounded-[10px] bg-warning-bg px-3 py-2.5 text-xs leading-normal text-warning-text">
          Thông tin do AI gợi ý, chưa được kiểm chứng. Hãy gọi hỏi lại trước
          khi đến.
        </div>
      )}

      <div className="mt-1 grid grid-cols-2 gap-2">
        {verified ? (
          <>
            <button
              type="button"
              onClick={call}
              className={`${BOOKING_BUTTON_CLASS} bg-primary text-white`}
            >
              <PhoneIcon size={18} />
              Gọi đặt lịch
            </button>
            <button
              type="button"
              onClick={openWebsite}
              className={`${BOOKING_BUTTON_CLASS} border-[1.5px] border-primary bg-white text-primary-dark`}
            >
              <GlobeIcon size={18} />
              Đặt trên website
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              disabled
              className={`${BOOKING_BUTTON_CLASS} bg-disabled-bg text-disabled`}
            >
              Gọi đặt lịch
            </button>
            <button
              type="button"
              disabled
              className={`${BOOKING_BUTTON_CLASS} bg-disabled-bg text-disabled`}
            >
              Đặt trên website
            </button>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => openUrl(mapsSearchUrl(location))}
          className={MAP_BUTTON_CLASS}
        >
          <MapPinIcon size={18} />
          Xem bản đồ
        </button>
        <button
          type="button"
          onClick={() => openUrl(mapsDirectionsUrl(location))}
          className={MAP_BUTTON_CLASS}
        >
          <DirectionsIcon size={18} />
          Chỉ đường
        </button>
      </div>
    </div>
  );
}
