import {
  ChartTelemetry,
  GaugeWidgetData,
  JsonValue,
  WidgetCardType,
  Widget,
  WidgetType,
} from "@/utils";
import { create } from "zustand";

type State = {
  data: Omit<Widget, "id">;
  step: number;
};

type Actions = {
  setData: (data: Omit<Widget, "id">) => void;
  setStep: (step: number) => void;
  setTitle: (name: string) => void;
  setDescription: (description: string) => void;
  setType: (type: WidgetType) => void;
  addTelemetry: (data: ChartTelemetry) => void;
  deleteTelemetry: (telemetry: ChartTelemetry) => void;
  nextStep: () => void;
  getDisabled: () => boolean;
  setAttribute: (key: string, value: JsonValue) => void;
  setApiUrl: (apiUrl: string) => void;
  setToken: (token: string) => void;
};

export const useAddWidgetStore = create<State & Actions>((set, get) => ({
  data: {
    title: "",
    type: "card",
    attributes: {},
    apiUrl: "http://54.197.132.147:1880/api/data",
    token: "123456",
  },
  step: 0,
  setData: (data: Omit<Widget, "id">) => {
    set({ data });
  },
  setStep: (step: number) => {
    set({ step });
  },
  setTitle: (name: string) => {
    set({
      data: {
        ...get().data,
        title: name,
      },
    });
  },
  setDescription: (description: string) => {
    set({
      data: {
        ...get().data,
        description,
      },
    });
  },
  setType: (type: WidgetType) => {
    set({
      data: {
        ...get().data,
        type,
        attributes: {},
      },
    });
  },
  addTelemetry: (data: ChartTelemetry) => {
    const telemetries = (get().data.attributes?.telemetries ||
      []) as ChartTelemetry[];
    const exist = telemetries.find(
      (item) => item.name === data.name
    );
    if (exist) return;
    const newTelemetries = [...telemetries, data];
    set({
      data: {
        ...get().data,
        attributes: {
          ...get().data.attributes,
          telemetries: newTelemetries,
        },
      },
    });
  },
  deleteTelemetry: (telemetry: ChartTelemetry) => {
    const telemetries = (get().data.attributes?.telemetries ||
      []) as ChartTelemetry[];
    const newTelemetries = telemetries.filter(
      (item) => item.name !== telemetry.name
    );
    set({
      data: {
        ...get().data,
        attributes: {
          ...get().data.attributes,
          telemetries: newTelemetries,
        },
      },
    });
  },
  nextStep: () => {
    const step = get().step;
    const title = get().data.title;
    const apiUrl = get().data.apiUrl;
    if (step === 1 || !title || !apiUrl) return;
    set({ step: step + 1 });
  },
  getDisabled: () => {
    const step = get().step;
    const title = get().data.title;
    const apiUrl = get().data.apiUrl;
    const type = get().data.type;
    const telemetries = get().data.attributes?.telemetries as ChartTelemetry[];
    if (!title || !apiUrl) return true;
    if (
      step === 1 &&
      ["lineChart", "barChart", "areaChart"].includes(type) &&
      !telemetries?.length
    )
      return true;
    if (step === 1 && type === "card") {
      const cardType = get().data.attributes?.type as WidgetCardType;
      const content = get().data.attributes?.content;
      const telemetryName = get().data.attributes?.telemetryName;
      if (!cardType) return true;
      if (cardType === "text" && !content) return true;
      if (cardType === "telemetry" && (!telemetryName)) {
        return true;
      }
    }
    if (step === 1 && type === "gauge") {
      const gaugeData = get().data.attributes as GaugeWidgetData;
      const {  telemetryName, stops } = gaugeData;
      return !telemetryName || !stops || !stops.length;
    }

    return false;
  },
  setAttribute: (key: string, value: JsonValue) => {
    set({
      data: {
        ...get().data,
        attributes: {
          ...get().data.attributes,
          [key]: value,
        },
      },
    });
  },
  setApiUrl: (apiUrl: string) => {
    set({
      data: {
        ...get().data,
        apiUrl,
      },
    });
  },
  setToken: (token: string) => {
    set({
      data: {
        ...get().data,
        token,
      },
    });
  },
}));
