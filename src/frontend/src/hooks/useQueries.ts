import { useMutation, useQuery } from "@tanstack/react-query";
import type { Inquiry } from "../backend.d";
import { useActor } from "./useActor";

export function useSubmitInquiry() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      message,
      preferredDate,
      preferredTime,
    }: {
      name: string;
      email: string;
      phone: string;
      message: string;
      preferredDate: string;
      preferredTime: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const fullMessage =
        preferredDate && preferredTime
          ? `${message}\n\n[Scheduled: ${preferredDate} at ${preferredTime}]`
          : message;
      return actor.submitInquiry(name, email, phone, fullMessage);
    },
  });
}

export function useGetAllInquiries() {
  const { actor, isFetching } = useActor();
  return useQuery<Inquiry[]>({
    queryKey: ["inquiries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInquiries();
    },
    enabled: !!actor && !isFetching,
  });
}
