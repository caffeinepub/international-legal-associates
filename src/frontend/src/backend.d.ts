import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Inquiry {
    id: bigint;
    name: string;
    email: string;
    message: string;
    phone: string;
}
export interface backendInterface {
    clearAllInquiries(): Promise<void>;
    getAllInquiries(): Promise<Array<Inquiry>>;
    getAllInquiriesSortedByName(): Promise<Array<Inquiry>>;
    getInquiryById(id: bigint): Promise<Inquiry>;
    getInquiryCount(): Promise<bigint>;
    submitInquiry(name: string, email: string, phone: string, message: string): Promise<bigint>;
}
