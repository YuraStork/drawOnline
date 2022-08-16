import { WsContext } from "context/ws.context";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Canvas } from "../../../components/canvas";
import { SettingsBar } from "../../../components/settings";
import { Toolbar } from "../../../components/toolbar";
import { PaintContext } from "../../../context/paintContext";
import { useCanvas } from "../../../hooks/canvas.hook";
import { RoomUsers } from "../roomUsers";

const Layout = styled.div`
  max-width: 1400px;
  max-height: 100vh;
  margin: 0 auto;
  display: grid;
  grid-template: 50px 50px 1fr / 1fr 200px;
  grid-template-areas: "toolbar toolbar"
                       "settings settings"
                       "canvas roomUsers";
`;

export const OnlineCanvas = () => {
  const data = useCanvas();
  const { socket } = useContext(WsContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    socket.on("CASE_EXIT", () => {
      navigate("/")
    })
  }, [])
  
  return (
    <PaintContext.Provider value={{ ...data }}>
      <Layout>
        <Toolbar />
        <SettingsBar />
        <Canvas />
        <RoomUsers />
      </Layout>
    </PaintContext.Provider>
  );
};
