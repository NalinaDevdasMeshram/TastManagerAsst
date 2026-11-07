import { useEffect, useRef, useState } from "react";

const UNDO_MS = 5000;

export default function useUndoDelete(onConfirmDelete) {
  const [pending, setPending] = useState(null); // { id, title }
  const timerRef = useRef(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = (id) => {
    timerRef.current = setTimeout(() => {
      onConfirmDelete(id);
      setPending(null);
      timerRef.current = null;
    }, UNDO_MS);
  };

  const requestDelete = (task) => {
    // A new delete finalizes the previous pending one right away
    if (pending) {
      clearTimer();
      onConfirmDelete(pending.id);
    }
    setPending({ id: task.id, title: task.title });
    startTimer(task.id);
  };

  const undo = () => {
    clearTimer();
    setPending(null);
  };

  useEffect(() => clearTimer, []);

  return {
    pendingId: pending?.id ?? null,
    pendingTitle: pending?.title ?? "",
    requestDelete,
    undo,
  };
}
