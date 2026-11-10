import {
  Department,
  AvailableTimeSlots,
  ClinicSuggestion,
  HealthTip,
  MedicationSession,
  PrescriptionItem,
} from "@/types";
import TeddyNH from "@/static/doctors/teddynh.png";
import DinhLD from "@/static/doctors/dinhld.png";
import XungTD from "@/static/doctors/xungtd.png";
import TranHT from "@/static/doctors/tranht.png";
import WilsonJ from "@/static/doctors/wilsonj.png";
import HiddlestonT from "@/static/doctors/hiddlestont.png";
import ViDN from "@/static/doctors/vidn.png";
import exploreKidHeight from "@/static/explore/explore-kid-height.png";
import exploreBeach from "@/static/explore/explore-beach.png";
import exploreScientist from "@/static/explore/explore-scientist.png";
import exploreRoom from "@/static/explore/explore-room.png";
import exploreDishes from "@/static/explore/explore-dishes.png";
import exploreOmega3 from "@/static/explore/explore-omega-3.png";
import newsThumbnail from "@/static/news.png";

/**
 * Clinic finder flow (sample data)
 */
export async function mockHealthTip(): Promise<HealthTip> {
  return {
    text: "Nhớ uống đủ nước trong ngày.",
    source: "Dữ liệu mẫu",
    reviewedAt: "20/10/2026",
  };
}

export async function mockAreas() {
  return [
    "Quận 1",
    "Quận 3",
    "Quận 5",
    "Quận 10",
    "Bình Thạnh",
    "Phú Nhuận",
    "Tân Bình",
    "Thủ Đức",
  ];
}

export async function mockClinicSuggestion(): Promise<ClinicSuggestion> {
  return {
    specialty: "Tai Mũi Họng",
    clinics: [
      {
        id: 1,
        name: "Bệnh viện Tai Mũi Họng TP.HCM",
        address: "155B Trần Quốc Thảo, Quận 3, TP.HCM",
        area: "Quận 3",
        hours: "Thứ 2 – Thứ 6, 7:00 – 16:30",
        verified: true,
        verifiedAt: "12/10/2026",
      },
      {
        id: 2,
        name: "Phòng khám Tai Mũi Họng Thành Đông",
        address: "2A/2 Phan Thúc Duyện, Tân Bình, TP.HCM",
        area: "Tân Bình",
        hours: "Thứ 2 – Chủ nhật, 17:00 – 20:00",
        verified: false,
      },
    ],
  };
}

export async function mockMedicationSchedule(): Promise<MedicationSession[]> {
  return [
    {
      id: "morning",
      label: "Sáng",
      time: "07:30",
      doses: [
        { id: 1, name: "Paracetamol 500mg", dose: "1 viên", note: "Sau ăn" },
        { id: 2, name: "Vitamin C 500mg", dose: "1 viên", note: "Sau ăn" },
      ],
    },
    {
      id: "afternoon",
      label: "Chiều",
      time: "12:30",
      doses: [
        { id: 3, name: "Paracetamol 500mg", dose: "1 viên", note: "Sau ăn" },
      ],
    },
    {
      id: "evening",
      label: "Tối",
      time: "19:30",
      doses: [
        { id: 4, name: "Paracetamol 500mg", dose: "1 viên", note: "Sau ăn" },
        {
          id: 5,
          name: "Cetirizin 10mg",
          dose: "1 viên",
          note: "Trước khi ngủ",
        },
      ],
    },
  ];
}

export async function mockPrescriptionItems(): Promise<PrescriptionItem[]> {
  return [
    { id: 1, name: "Amoxicillin 500mg", dose: "1 viên", timesPerDay: 2, days: 7 },
    { id: 2, name: "Paracetamol 500mg", dose: "1 viên", timesPerDay: 3, days: 5 },
  ];
}

export async function mockSymptoms() {
  return [
    "Đau đầu",
    "Choáng váng",
    "Sốt cao",
    "Ho khan",
    "Khó thở",
    "Đau họng",
    "Mệt mỏi",
    "Chán ăn",
    "Buồn nôn",
    "Tiêu chảy",
  ];
}

export async function mock7DaysTimeSlots() {
  const START_HOUR = 8;
  const END_HOUR = 21;

  const slots: AvailableTimeSlots[] = [];
  const today = new Date();

  const generateSlots = (date: Date) => {
    const slots: AvailableTimeSlots["slots"][number][] = [];
    const currentDate = new Date();
    const isToday = date.toDateString() === currentDate.toDateString();
    const startHour = isToday
      ? Math.max(START_HOUR, new Date().getHours() + 1)
      : START_HOUR; // Start from 8 AM if not today

    for (let hour = startHour; hour < END_HOUR; hour++) {
      // Full hour slot
      slots.push({
        hour,
        isAvailable: Math.random() > 0.3,
      });

      // Half hour slot
      slots.push({
        hour,
        half: true,
        isAvailable: Math.random() > 0.3,
      });
    }

    return slots;
  };

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    slots.push({
      date,
      slots: generateSlots(date),
    });
  }

  return slots;
}

export async function mockDoctors() {
  return [
    {
      id: 1,
      name: "Nguyễn Nhất Vĩ",
      title: "Phó Trưởng Khoa",
      languages: "Tiếng Việt, English",
      specialties: "Thần Kinh Nội Khoa, Chóng Mặt, Đau Đầu Chuyên Khoa",
      image: ViDN,
      isAvailable: Math.random() > 0.3,
    },
    {
      id: 2,
      name: "Lê Đa Đình",
      title: "Trưởng Khoa",
      languages: "Tiếng Việt, English, 한국어",
      specialties: "Nội Khoa, Bệnh Gan",
      image: DinhLD,
      isAvailable: Math.random() > 0.3,
    },
    {
      id: 3,
      name: "Hoàng Đình Xưng",
      title: "Trưởng Khoa",
      languages: "Tiếng Việt, English",
      specialties: "Nội Khoa, Bệnh Gan",
      image: XungTD,
      isAvailable: Math.random() > 0.3,
    },
    {
      id: 4,
      name: "Lê Thảo Nhi",
      title: "Trưởng Khoa",
      languages: "Tiếng Việt, English, 한국어",
      specialties: "Nội Khoa, Bệnh Gan",
      image: TranHT,
      isAvailable: Math.random() > 0.3,
    },
    {
      id: 5,
      name: "John Wilson",
      title: "MD",
      languages: "Tiếng Việt, English",
      specialties: "Nội Khoa, Bệnh Gan",
      image: WilsonJ,
      isAvailable: Math.random() > 0.3,
    },
    {
      id: 6,
      name: "Tom Hiddleston",
      title: "MD",
      languages: "Tiếng Việt, English, 한국어",
      specialties: "Nội Khoa, Bệnh Gan",
      image: HiddlestonT,
      isAvailable: Math.random() > 0.3,
    },
    {
      id: 7,
      name: "TeddyNH",
      title: "Trưởng Khoa",
      languages: "Tiếng Việt, English, 한국어",
      specialties: "Nội Khoa, Bệnh Gan",
      image: TeddyNH,
      isAvailable: Math.random() > 0.3,
    },
  ];
}

export async function mockServices() {
  const [d1, d2] = await mockDepartments();

  return [
    {
      id: 1,
      name: "Điều trị giảm cân",
      description: mockDescription(exploreDishes),
      image: exploreDishes,
      price: 100000,
      department: d1,
    },
    {
      id: 2,
      name: "Xoá cận",
      description: mockDescription(exploreKidHeight),
      image: exploreKidHeight,
      price: 100000,
      department: d2,
    },
    {
      id: 3,
      name: "Trị nám",
      description: mockDescription(exploreOmega3),
      image: exploreOmega3,
      price: 100000,
      department: d2,
    },
  ];
}

export async function mockBookings() {
  const [d1, d2, d3] = await mockDoctors();
  const [de1, de2, de3] = await mockDepartments();
  return [
    {
      id: 1,
      status: "Ngày mai",
      patientName: "Băng Đôn Đôn",
      schedule: {
        date: new Date("2025-05-14T09:00:00"),
        time: {
          hour: 9,
          half: true,
        },
      },
      doctor: d1,
      department: de1,
    },
    {
      id: 2,
      status: "Hoàn thành",
      patientName: "Băng Đôn Đôn",
      schedule: {
        date: new Date("2025-05-14T09:00:00"),
        time: {
          hour: 9,
          half: false,
        },
      },
      doctor: d2,
      department: de2,
    },
    {
      id: 3,
      status: "Hoàn thành",
      patientName: "Băng Đôn Đôn",
      schedule: {
        date: new Date("2025-05-14T09:00:00"),
        time: {
          hour: 13,
          half: true,
        },
      },
      doctor: d3,
      department: de3,
    },
  ];
}

export async function mockInvoices() {
  const [b1, b2] = await mockBookings();
  return [
    {
      id: 1,
      booking: b1,
    },
    {
      id: 2,
      booking: b2,
    },
  ];
}

export async function mockDepartmentGroups() {
  const groups = [
    "Nội khoa",
    "Ngoại khoa",
    "Tim mạch",
    "Phụ khoa",
    "Sinh Sản",
    "Nhi khoa",
    "Nhãn khoa",
    "Tai mũi họng",
    "Da liễu",
    "Chỉnh hình",
  ];

  return groups.map((name, i) => ({
    id: i + 1,
    name,
    description: `Khoa ${name} đã được chứng nhận chất lượng bởi tổ chức gia đình bác sĩ thế giới WONCA.`,
  }));
}

export const mockDescription = (imageUrl) =>
  `<div class="flex items-start text-base font-medium"><p>Khoa nội khoa tổng quát đã được chứng nhận chất lượng bởi tổ chức gia đình bác sĩ thế giới WONCA</p></div><div class="flex items-start"><p>Bệnh nội khoa, tổng quát bao gồm rất nhiều bệnh lý thuộc các chuyên ngành y khác nhau, chủ yếu được điều trị bằng thuốc kết hợp các thủ thuật nhỏ (nếu có) và thay đổi lối sống, chế độ dinh dưỡng, nghỉ ngơi, vận động khoa học.</p></div><img class="rounded-lg" src="${imageUrl}" /><div><span><p class="mb-1.5">Khám nội tổng quát (hay khám nội khoa) hay khám sức khỏe nội tổng quát là cách hiệu quả để mỗi người chủ động phát hiện bệnh kịp thời và điều trị bệnh từ sớm. Quy trình thăm khám nội tổng quát thường bao gồm:</p><div class="mb-1.5 h-5"></div><p class="mb-1.5">Kiểm tra cơ bản: Bao gồm việc kiểm tra cân nặng, chiều cao, đo huyết áp… Các thông số này có thể cung cấp những thông tin quan trọng về tình trạng sức khỏe cơ bản của cơ thể.</p><p class="mb-1.5">Khám lâm sàng (nội hô hấp, tiêu hóa, nội tiết, thần kinh, cơ xương khớp, tai mũi họng, răng hàm mặt…): Thông qua việc khám lâm sàng, bác sĩ có thể đánh giá ban đầu tình trạng sức khỏe, bệnh lý của người bệnh..</p><p class="mb-1.5">Xét nghiệm, chụp chiếu: Sau khám lâm sàng, bác sĩ có thể chỉ định người bệnh thực hiện các cận lâm sàng chuyên sâu như xét nghiệm máu, xét nghiệm nước tiểu, siêu âm bụng, siêu âm tim, siêu âm tổng quát, chụp X-quang, chụp CT, chụp MRI, siêu âm… để tầm soát, đánh giá, phát hiện các bệnh lý liên quan, kể cả ung thư.</p><p>Lưu ý, quy trình ở trên chỉ mang tính tham khảo. Tùy mỗi bệnh lý hay tùy tại mỗi cơ sở y tế, danh mục khám nội tổng quát, quy trình sẽ được xây dựng khác nhau và còn thay đổi.</p></span></div>`;

export async function mockDepartments() {
  const groups = await mockDepartmentGroups();
  let id = 0;

  return groups.reduce(
    (res, group) =>
      res.concat(
        ["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => ({
          id: ++id,
          name: `${group.name} ${letter}`,
          shortDescription: group.description,
          description: mockDescription(newsThumbnail),
          groupId: group.id,
        }))
      ),
    [] as Department[]
  );
}

export async function mockArticles() {
  return [
    {
      id: 1,
      title:
        "Tăng chiều cao, sức bền cho trẻ em - Kỳ 2: Làm gì để thanh niên cao hơn, khỏe hơn?",
      description:
        "Cục An toàn thực phẩm đề nghị Viện Dinh dưỡng quốc gia, Sở Y tế Đồng Nai kiểm tra",
      category: "Sức khỏe",
      timeAgo: "2 tháng trước",
      image: exploreKidHeight,
      content: mockDescription(exploreKidHeight),
    },
    {
      id: 2,
      title: "Khám phá bãi biển đẹp nhất Việt Nam",
      description:
        "Cục An toàn thực phẩm đề nghị Viện Dinh dưỡng quốc gia, Sở Y tế Đồng Nai kiểm tra",
      category: "Du lịch",
      timeAgo: "1 tuần trước",
      image: exploreBeach,
      content: mockDescription(exploreBeach),
    },
    {
      id: 3,
      title: "Những phát minh khoa học mới nhất năm 2024",
      description:
        "Cục An toàn thực phẩm đề nghị Viện Dinh dưỡng quốc gia, Sở Y tế Đồng Nai kiểm tra",
      category: "Khoa học",
      timeAgo: "3 ngày trước",
      image: exploreScientist,
      content: mockDescription(exploreScientist),
    },
    {
      id: 4,
      title: "Thiết kế phòng ngủ hiện đại cho gia đình",
      description:
        "Cục An toàn thực phẩm đề nghị Viện Dinh dưỡng quốc gia, Sở Y tế Đồng Nai kiểm tra",
      category: "Nhà cửa",
      timeAgo: "5 ngày trước",
      image: exploreRoom,
      content: mockDescription(exploreRoom),
    },
    {
      id: 5,
      title: "Công thức nấu ăn ngon cho cả gia đình",
      description:
        "Cục An toàn thực phẩm đề nghị Viện Dinh dưỡng quốc gia, Sở Y tế Đồng Nai kiểm tra",
      category: "Ẩm thực",
      timeAgo: "1 ngày trước",
      image: exploreDishes,
      content: mockDescription(exploreDishes),
    },
    {
      id: 6,
      title: "Lợi ích của Omega-3 cho sức khỏe",
      description:
        "Cục An toàn thực phẩm đề nghị Viện Dinh dưỡng quốc gia, Sở Y tế Đồng Nai kiểm tra",
      category: "Dinh dưỡng",
      timeAgo: "4 ngày trước",
      image: exploreOmega3,
      content: mockDescription(exploreOmega3),
    },
  ];
}

export async function mockFeedbackCategories() {
  return ["Tình trạng hoạt động", "Thái độ nhân viên", "Khác"];
}
