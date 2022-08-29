import { handleLeave } from "api/user/leave";
import { PaintContext } from "context/paintContext";
import { useCanvas } from "hooks/useCanvas/useCanvas.hook";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "store/store";
import styled from "styled-components";
import { Canvas } from "../../../components/canvas";
import { SettingsBar } from "../../../components/settings";
import { Toolbar } from "../../../components/toolbar";
import { RoomUsers } from "../roomUsers";
import { CanvasSection } from "./styles";

const Layout = styled.div`
  max-width: 1400px;
  max-height: 100vh;
  margin: 0 auto;
  display: grid;
  gap: 5px;
  grid-template: 52px 52px 1fr / 1fr 200px;
  grid-template-areas:
    "toolbar toolbar"
    "settings settings"
    "canvas roomUsers";
  & > div {
    border-radius: 5px;
  }
`;
type ParamsProps = {
  roomId: string;
};

export const OnlineCanvas = () => {
  const data = useCanvas();
  const user = useAppSelector((s) => s.user.data);
  const { roomId } = useParams<ParamsProps>();

  useEffect(
    () => () => {
      handleLeave(user.id, roomId || "");
    },
    []
  );

  return (
    <CanvasSection>
      <PaintContext.Provider value={{ ...data }}>
        <Layout>
          <Toolbar />
          <SettingsBar />
          <Canvas />
          <RoomUsers />
        </Layout>
      </PaintContext.Provider>
    </CanvasSection>
  );
};
