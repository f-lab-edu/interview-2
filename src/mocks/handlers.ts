import { http, HttpResponse } from "msw";
import type {
  QueueStatus,
  QueueToken,
  Reservation,
  Seat,
  Ticket,
} from "../types/ticket";

const tickets: Ticket[] = [
  {
    id: "1",
    title: "BTS 월드투어 2024",
    description:
      "BTS의 월드투어 공연입니다. 전 세계 팬들과 함께하는 특별한 순간을 경험하세요.",
    image: "https://picsum.photos/400/300?random=1",
    price: 150000,
    totalSeats: 1000,
    availableSeats: 800,
    eventDate: "2024-12-25",
    venue: "올림픽공원 체조경기장",
  },
  {
    id: "2",
    title: "IU 콘서트 2024 (대기열 필수)",
    description:
      "IU의 특별한 콘서트입니다. 인기가 많아 항상 대기열이 발생합니다. 아름다운 음악과 함께하는 잊을 수 없는 시간을 만들어보세요.",
    image: "https://picsum.photos/400/300?random=2",
    price: 120000,
    totalSeats: 800,
    availableSeats: 600,
    eventDate: "2024-11-15",
    venue: "잠실실내체육관",
  },
  {
    id: "3",
    title: "블랙핑크 월드투어",
    description:
      "블랙핑크의 화려한 월드투어 공연입니다. 강렬한 퍼포먼스를 감상하세요.",
    image: "https://picsum.photos/400/300?random=3",
    price: 180000,
    totalSeats: 1200,
    availableSeats: 900,
    eventDate: "2024-10-20",
    venue: "고척스카이돔",
  },
];

const seats: Record<string, Seat[]> = {
  "1": Array.from({ length: 50 }, (_, i) => ({
    id: `1-${Math.floor(i / 10) + 1}-${(i % 10) + 1}`,
    row: String.fromCharCode(65 + Math.floor(i / 10)),
    number: (i % 10) + 1,
    price: 150000 + Math.floor(i / 10) * 10000,
    isAvailable: Math.random() > 0.3,
  })),
  "2": Array.from({ length: 40 }, (_, i) => ({
    id: `2-${Math.floor(i / 10) + 1}-${(i % 10) + 1}`,
    row: String.fromCharCode(65 + Math.floor(i / 10)),
    number: (i % 10) + 1,
    price: 120000 + Math.floor(i / 10) * 8000,
    isAvailable: Math.random() > 0.2,
  })),
  "3": Array.from({ length: 60 }, (_, i) => ({
    id: `3-${Math.floor(i / 10) + 1}-${(i % 10) + 1}`,
    row: String.fromCharCode(65 + Math.floor(i / 10)),
    number: (i % 10) + 1,
    price: 180000 + Math.floor(i / 10) * 12000,
    isAvailable: Math.random() > 0.25,
  })),
};

const queueTokens = new Map<string, QueueToken>();
const reservations = new Map<string, Reservation>();

const queueStatus = new Map<
  string,
  {
    position: number;
    totalInQueue: number;
    startTime: number;
    isActive: boolean;
    lastCompletedTime: number;
  }
>();

export const handlers = [
  http.get("/api/tickets", () => {
    return HttpResponse.json({
      success: true,
      data: tickets,
    });
  }),

  http.get("/api/tickets/:id", ({ params }) => {
    const ticket = tickets.find((t) => t.id === params.id);
    if (!ticket) {
      return HttpResponse.json(
        { success: false, message: "티켓을 찾을 수 없습니다." },
        { status: 404 }
      );
    }
    return HttpResponse.json({
      success: true,
      data: ticket,
    });
  }),

  http.post("/api/tickets/:id/enter", async ({ params }) => {
    const ticketId = params.id as string;
    const ticket = tickets.find((t) => t.id === ticketId);

    if (!ticket) {
      return HttpResponse.json(
        { success: false, message: "티켓을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const currentQueue = queueStatus.get(ticketId) || {
      position: 0,
      totalInQueue: 0,
      startTime: Date.now(),
      isActive: false,
      lastCompletedTime: 0,
    };

    let hasQueue = false;
    if (ticketId === "2") {
      hasQueue = true;
      if (!currentQueue.isActive) {
        currentQueue.isActive = true;
        currentQueue.startTime = Date.now();
      }
    } else {
      hasQueue = false;
    }

    const tokenId = `token_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    const expiresAt = Date.now() + (hasQueue ? 30 * 60 * 1000 : 60 * 1000);

    const queueToken: QueueToken = {
      id: tokenId,
      ticketId,
      status: hasQueue ? "waiting" : "ready",
      position: hasQueue ? currentQueue.totalInQueue + 1 : 0,
      totalInQueue: hasQueue ? currentQueue.totalInQueue + 1 : 0,
      expiresAt,
      createdAt: Date.now(),
    };

    queueTokens.set(tokenId, queueToken);

    if (ticketId === "2") {
      queueStatus.set(ticketId, {
        position: currentQueue.position,
        totalInQueue: currentQueue.totalInQueue + 1,
        startTime: currentQueue.startTime,
        isActive: currentQueue.isActive,
        lastCompletedTime: currentQueue.lastCompletedTime,
      });
    }

    return HttpResponse.json({
      success: true,
      data: {
        tokenId,
        hasQueue,
        expiresAt,
      },
    });
  }),

  http.get("/api/queue/:tokenId", ({ params }) => {
    const tokenId = params.tokenId as string;
    const token = queueTokens.get(tokenId);

    if (!token) {
      return HttpResponse.json(
        { success: false, message: "유효하지 않은 토큰입니다." },
        { status: 404 }
      );
    }

    if (Date.now() > token.expiresAt) {
      token.status = "expired";
      queueTokens.set(tokenId, token);
      return HttpResponse.json(
        { success: false, message: "토큰이 만료되었습니다." },
        { status: 410 }
      );
    }

    const queue = queueStatus.get(token.ticketId) || {
      position: 0,
      totalInQueue: 0,
      startTime: Date.now(),
      isActive: false,
      lastCompletedTime: 0,
    };

    let progress = 0;
    if (queue.isActive) {
      const elapsed = Date.now() - queue.startTime;
      progress = Math.min(100, Math.floor((elapsed / (30 * 1000)) * 100));
    }

    if (progress >= 100 && token.status === "waiting") {
      token.status = "ready";
      token.position = 0;
      queueTokens.set(tokenId, token);

      queue.lastCompletedTime = Date.now();
      queueStatus.set(token.ticketId, queue);
    }

    const queueStatusData: QueueStatus = {
      position: token.position,
      totalInQueue: queue.totalInQueue,
      progress,
      estimatedWaitTime: queue.isActive
        ? Math.max(0, 30 * 1000 - (Date.now() - queue.startTime))
        : 0,
    };

    return HttpResponse.json({
      success: true,
      data: {
        token,
        queueStatus: queueStatusData,
      },
    });
  }),

  http.get("/api/tickets/:id/seats", ({ params }) => {
    const ticketId = params.id as string;
    const ticketSeats = seats[ticketId] || [];

    return HttpResponse.json({
      success: true,
      data: ticketSeats,
    });
  }),

  http.post("/api/reservations", async ({ request }) => {
    const body = (await request.json()) as { tokenId: string; seatId: string };
    const { tokenId, seatId } = body;

    const token = queueTokens.get(tokenId);
    if (!token) {
      return HttpResponse.json(
        { success: false, message: "유효하지 않은 토큰입니다." },
        { status: 404 }
      );
    }

    if (token.status === "expired") {
      return HttpResponse.json(
        { success: false, message: "토큰이 만료되었습니다." },
        { status: 410 }
      );
    }

    if (token.status === "waiting") {
      return HttpResponse.json(
        { success: false, message: "아직 대기열에 있습니다." },
        { status: 400 }
      );
    }

    if (Date.now() > token.expiresAt) {
      token.status = "expired";
      queueTokens.set(tokenId, token);
      return HttpResponse.json(
        { success: false, message: "토큰이 만료되었습니다." },
        { status: 410 }
      );
    }

    const ticketSeats = seats[token.ticketId] || [];
    const seat = ticketSeats.find((s) => s.id === seatId);

    if (!seat) {
      return HttpResponse.json(
        { success: false, message: "좌석을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    if (!seat.isAvailable) {
      return HttpResponse.json(
        { success: false, message: "이미 예약된 좌석입니다." },
        { status: 400 }
      );
    }

    const reservationId = `reservation_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    const reservation: Reservation = {
      id: reservationId,
      ticketId: token.ticketId,
      seatId,
      price: seat.price,
      status: "completed",
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      createdAt: Date.now(),
    };

    reservations.set(reservationId, reservation);

    seat.isAvailable = false;
    seats[token.ticketId] = ticketSeats.map((s) =>
      s.id === seatId ? seat : s
    );

    token.status = "expired";
    queueTokens.set(tokenId, token);

    return HttpResponse.json({
      success: true,
      data: reservation,
    });
  }),

  http.get("/api/reservations/:id", ({ params }) => {
    const reservationId = params.id as string;
    const reservation = reservations.get(reservationId);

    if (!reservation) {
      return HttpResponse.json(
        { success: false, message: "예약을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const ticket = tickets.find((t) => t.id === reservation.ticketId);
    const seat = seats[reservation.ticketId]?.find(
      (s) => s.id === reservation.seatId
    );

    return HttpResponse.json({
      success: true,
      data: {
        reservation,
        ticket,
        seat,
      },
    });
  }),
];
