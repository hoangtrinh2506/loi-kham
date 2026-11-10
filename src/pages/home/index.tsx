import { useAtomValue } from "jotai";
import Screen from "@/components/flow/screen";
import {
  CameraIcon,
  ClockIcon,
  PhoneIcon,
  SearchIcon,
} from "@/components/flow/icons";
import TransitionLink from "@/components/transition-link";
import { healthTipState } from "@/state";
import { getConfig } from "@/utils/miscellaneous";

const SHORTCUTS = [
  { to: "/medication", label: "Lịch uống thuốc", icon: ClockIcon },
  { to: "/prescription", label: "Quét toa thuốc", icon: CameraIcon },
];

function HomePage() {
  const tip = useAtomValue(healthTipState);

  return (
    <Screen className="gap-4">
      <div className="flex flex-col gap-1.5 px-1 pt-4">
        <div className="text-xs font-semibold tracking-wide text-muted">
          {getConfig((c) => c.app.title)}
        </div>
        <h1 className="text-[26px] leading-tight font-bold">
          Bạn cần hỗ trợ gì hôm nay?
        </h1>
      </div>

      <section className="flex flex-col gap-3 rounded-[20px] bg-primary p-5 text-white">
        <div className="flex items-center gap-2.5">
          <SearchIcon />
          <h2 className="text-[20px] leading-7 font-bold">
            Tìm phòng khám phù hợp
          </h2>
        </div>
        <p className="text-sm leading-normal opacity-95">
          Mô tả triệu chứng và chọn khu vực. Ứng dụng gợi ý chuyên khoa và cơ sở
          để bạn tham khảo.
        </p>
        <TransitionLink
          to="/symptoms"
          className="flex min-h-12 items-center justify-center rounded-xl bg-white text-lg font-bold text-primary-dark"
        >
          Bắt đầu
        </TransitionLink>
      </section>

      <TransitionLink
        to="/emergency"
        className="sticky top-[calc(var(--safe-top)+8px)] z-10 flex min-h-14 items-center gap-3 rounded-[14px] border border-danger-line bg-danger-soft px-4 text-lg font-bold text-danger-text"
      >
        <PhoneIcon />
        <span>Khẩn cấp? Gọi 115</span>
      </TransitionLink>

      <div className="grid grid-cols-2 gap-3">
        {SHORTCUTS.map(({ to, label, icon: Icon }) => (
          <TransitionLink
            key={to}
            to={to}
            className="flex min-h-[104px] flex-col gap-2.5 rounded-2xl border border-line bg-white p-4"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-highlight text-primary-dark">
              <Icon />
            </span>
            <span className="text-base font-semibold">{label}</span>
          </TransitionLink>
        ))}
      </div>

      <div className="flex flex-col gap-2 rounded-2xl border border-line bg-white p-4">
        <span className="text-2xs font-bold tracking-wide text-primary-dark">
          NHẮC NHỞ SỨC KHOẺ
        </span>
        <p className="text-lg leading-snug font-semibold">{tip.text}</p>
        <p className="text-2xs leading-normal text-muted">
          Nguồn: {tip.source} · Duyệt ngày {tip.reviewedAt}
        </p>
      </div>

      <p className="mt-auto px-1 text-2xs leading-normal text-muted">
        Thông tin chỉ mang tính tham khảo, không thay thế tư vấn của bác sĩ. Mô
        tả triệu chứng của bạn không được lưu lại.
      </p>
    </Screen>
  );
}

export default HomePage;
