import { useState } from "react";

export function useEditableField<T>(serverValue: T, commit: (next: T) => Promise<unknown>) {
    const [draft, setDraft] = useState(serverValue);
    const [lastServer, setLastServer] = useState(serverValue);

    if (serverValue !== lastServer) {
        setLastServer(serverValue);
        setDraft(serverValue);
    }

    const save = async (next: T = draft) => {
        if (next === serverValue) return;
        try {
            await commit(next);
        } catch {
            setDraft(serverValue);
        }
    };

    return { value: draft, setValue: setDraft, save };
}