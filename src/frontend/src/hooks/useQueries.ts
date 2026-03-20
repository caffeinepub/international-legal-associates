import { useMutation, useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: bigint;
}

export function useSubmitInquiry() {
  const { actor: _actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name: _name,
      email: _email,
      phone: _phone,
      message: _message,
      preferredDate: _preferredDate,
      preferredTime: _preferredTime,
    }: {
      name: string;
      email: string;
      phone: string;
      message: string;
      preferredDate: string;
      preferredTime: string;
    }) => {
      // Backend inquiry submission not available in this version
      return Promise.resolve();
    },
  });
}

export function useGetAllInquiries() {
  const { actor: _actor, isFetching } = useActor();
  return useQuery<Inquiry[]>({
    queryKey: ["inquiries"],
    queryFn: async () => {
      return [];
    },
    enabled: !isFetching,
  });
}

export function useGetMessages() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMessages(BigInt(50));
    },
    enabled: !!actor && !isFetching,
  });
}
