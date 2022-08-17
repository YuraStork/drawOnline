const pushUndo = (snapshotIndex: any, setSnapshotIndex: any) => {
  if (snapshotIndex > 0 && snapshotIndex < 10) {
    setSnapshotIndex((prev: any) => (prev -= 1));
  }
};

const pushRedo = (snapshotIndex: any, snapshotList: any, setSnapshotIndex: any) => {
  if (snapshotIndex < snapshotList.length - 1) {
    setSnapshotIndex((prev: any) => (prev += 1));
  }
};

const handleSnapshot = (data: any) => {
  const { snapshotList, setSnapshotIndex, setSnapshotList, canvasRef } = data;

  if (snapshotList.length < 10) {
    setSnapshotList((prev: any) => [...prev, canvasRef.current.toDataURL()]);
    setSnapshotIndex((prev: any) => (prev += 1));
  } else {
    setSnapshotList((prev: any) => [
      ...prev.slice(1, 10),
      canvasRef.current.toDataURL(),
    ]);
  }
};

export { pushUndo, pushRedo, handleSnapshot }