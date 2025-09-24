"use Client";

import InputTemplate from "@/components/inputTemplate/inputTemplate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { forwardRef, useImperativeHandle, useRef } from "react";
import inputLayout from "@/components/inputTemplate/inputTemplate.module.css";
import "@/styles/dialog.css";
import { ChevronDown } from "lucide-react";
import {
    addStaffMember,
    editStaffMember,
    FetchStaffMember,
} from "@/services/StaffFetches/useStaff";

type IDialog = {
    staffMemberId: string;
};

export type ModalHandle = {
    showModal: () => void;
};

export const ManageStaffDialog = forwardRef<ModalHandle, IDialog>(
    ({ staffMemberId }, ref) => {
        console.log("staffMemberId", staffMemberId);
        const dialogRef = useRef<HTMLDialogElement>(null);
        const formRef = useRef<HTMLFormElement>(null);

        const queryClient = useQueryClient();

        useImperativeHandle(ref, () => ({
            showModal: () => {
                dialogRef.current?.showModal();
            },
        }));

        const { mutate, isPending, isError } = useMutation({
            mutationFn: (payload: {
                memberId?: string;
                formData: FormData;
            }) => {
                if (payload.memberId) {
                    return editStaffMember({
                        memberId: payload.memberId,
                        formData: payload.formData,
                    });
                } else {
                    return addStaffMember(payload.formData);
                }
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["staffMembers"] });
            },
        });

        const {
            data: memberData,
            error,
            isLoading,
        } = useQuery({
            queryKey: ["staffMembers", staffMemberId],
            queryFn: ({ queryKey }) => {
                const [, staffMemberId] = queryKey;
                console.log(staffMemberId);
                return FetchStaffMember(staffMemberId as string);
            },
            enabled: !!staffMemberId,
        });

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const form = e.currentTarget;
            const formData = new FormData(form);

            mutate({ memberId: staffMemberId || undefined, formData });
            e.currentTarget.reset();
            dialogRef?.current?.close();
        };

        return (
            <dialog ref={dialogRef} className={`dialogBox`}>
                <form
                    onSubmit={handleSubmit}
                    ref={formRef}
                    className="dialogContent"
                >
                    <InputTemplate
                        type="text"
                        inputText="Imie i nazwisko"
                        name="name"
                        defaultValue={
                            staffMemberId !== "" ? memberData?.name : null
                        }
                    />
                    <InputTemplate
                        type="number"
                        inputText="Wiek"
                        name="age"
                        defaultValue={
                            staffMemberId !== "" ? memberData?.age : null
                        }
                    />
                    <div className={inputLayout.inputGroup}>
                        <select name="role" defaultValue={memberData?.role}>
                            <option value="Główny Trener">Główny Trener</option>
                            <option value="Asystent Trenera">
                                Asystent Trenera
                            </option>
                            <option value="Trener Bramkarzy">
                                Trener Bramkarzy
                            </option>
                            <option value="Fizjoterapeuta">
                                Fizjoterapeuta
                            </option>
                            <option value="Lekarz">Lekarz</option>
                            <option value="Trener przygotowania fizycznego">
                                Trener przygotowania fizycznego
                            </option>
                            <option value="Analityk">Analityk</option>
                        </select>
                        <label>Pozycja</label>
                        <ChevronDown className={inputLayout.selectIcon} />
                    </div>
                    <div className={inputLayout.inputGroup}>
                        <select
                            name="ageGroup"
                            defaultValue={memberData?.ageGroup}
                        >
                            <option value="U12">U12</option>
                        </select>
                        <label>Grupa wiekowa</label>
                    </div>
                    <div>
                        <input
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            name="photo"
                        />
                    </div>
                    <input
                        type="text"
                        defaultValue={memberData?.photo}
                        name="photoPath"
                        hidden
                    />
                    <div className="dialogButtonBox">
                        <button
                            type="button"
                            onClick={() => {
                                dialogRef?.current?.close();
                                formRef?.current?.reset();
                            }}
                            className="buttonStyle cancelBtn"
                        >
                            Anuluj
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="buttonStyle addBtn"
                        >
                            {staffMemberId
                                ? isPending
                                    ? "Aktualizowanie..."
                                    : "Edytuj"
                                : isPending
                                ? "Dodawanie..."
                                : "Dodaj"}
                        </button>
                    </div>
                </form>
            </dialog>
        );
    }
);
