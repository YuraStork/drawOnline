type handleSnapshotProps = {
  snapshotList: string[];
  snapshotIndex: number;
  setSnapshotIndex: React.Dispatch<React.SetStateAction<number>>;
  setSnapshotList: React.Dispatch<React.SetStateAction<string[]>>;
  canvasRef: React.MutableRefObject<HTMLCanvasElement>;
};

const pushUndo = (
  snapshotIndex: number,
  setSnapshotIndex: React.Dispatch<React.SetStateAction<number>>
) => {
  if (snapshotIndex > 0 && snapshotIndex < 10) {
    setSnapshotIndex((prev) => (prev -= 1));
  }
};

const pushRedo = (
  snapshotIndex: number,
  snapshotList: string[],
  setSnapshotIndex: React.Dispatch<React.SetStateAction<number>>
) => {
  if (snapshotIndex < snapshotList.length - 1) {
    setSnapshotIndex((prev) => (prev += 1));
  }
};

const handleSnapshot = (data: handleSnapshotProps) => {
  const { snapshotList, setSnapshotIndex, setSnapshotList, canvasRef } = data;

  if (snapshotList.length < 10) {
    setSnapshotList((prev) => [...prev, canvasRef.current.toDataURL()]);
    setSnapshotIndex((prev) => (prev += 1));
  } else {
    setSnapshotList((prev) => [
      ...prev.slice(1, 10),
      canvasRef.current.toDataURL(),
    ]);
  }
};

export { pushUndo, pushRedo, handleSnapshot };
