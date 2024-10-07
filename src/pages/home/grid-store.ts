import { DateRange, generateRandomString, Widget, WidgetType } from "@/utils";
import { Layout } from "react-grid-layout";
import { create } from "zustand";

type addWidgetInput = Omit<Widget, "id">;

type State = {
  editMode: boolean;
  actionHover: boolean;
  layouts: Layout[];
  widgets: Widget[];
  isUpdated: boolean;
  dateRange: DateRange;
  widgetId: string | null;
};

type Actions = {
  setEditMode: (editMode: boolean) => void;
  toggleEditMode: () => void;
  setActionHover: (val: boolean) => void;
  setLayouts: (layouts: Layout[]) => void;
  setWidgets: (widgets: Widget[]) => void;
  addWidget: (widget: addWidgetInput, widgetId?: string) => void;
  setUpdated: (val: boolean) => void;
  setFrom: (val: Date) => void;
  setDateRange: (val: DateRange) => void;
  setWidgetId: (val: string | null) => void;
};

const getWidgetSize = (type: WidgetType) => {
  if (["lineChart", "areaChart", "barChart"].includes(type))
    return { w: 4, h: 3, minW: 3, minH: 2 };
  if (["pieChart", "donutChart", "barChart"].includes(type))
    return { w: 3, h: 3, minW: 2, minH: 3 };
  if (["gauge"].includes(type)) return { w: 3, h: 2, minW: 2, minH: 2 };
  if (["radialBar"].includes(type)) return { w: 3, h: 3, minW: 3, minH: 3 };
  if (type === "table") return { w: 4, h: 4, minW: 3, minH: 3 };
  if (type === "card") return { w: 3, h: 1, minW: 2, minH: 1 };
  if (type === "video") return { w: 3, h: 3, minW: 3, minH: 3 };
  else return { w: 2, h: 2 };
};

const defaultState: State = {
  editMode: false,
  actionHover: false,
  layouts: [],
  widgets: [],
  isUpdated: false,
  dateRange: {},
  widgetId: null,
};

export const useGridStore = create<State & Actions>((set, get) => ({
  ...defaultState,
  setEditMode: (editMode) => set({ editMode }),
  toggleEditMode: () => set((state) => ({ editMode: !state.editMode })),
  setActionHover: (val) => set({ actionHover: val }),
  setLayouts: (layouts) => set({ layouts, isUpdated: true }),
  setWidgets: (widgets) => set({ widgets }),
  addWidget: (data: addWidgetInput) => {
    const widgetId = get().widgetId;
    if (widgetId !== "new") {
      const widgets = get().widgets.map((widget) =>
        widget.id === widgetId ? { ...widget, ...data } : widget
      );
      set({ widgets, isUpdated: true, editMode: false });
      return;
    }
    const id = generateRandomString(8, false);
    const maxX = get().layouts.reduce((acc, cur) => {
      if (cur.x + cur.w > acc) return cur.x + cur.w;
      return acc;
    }, 0);
    const maxY = get().layouts.reduce((acc, cur) => {
      if (cur.y + cur.h > acc) return cur.y + cur.h;
      return acc;
    }, 0);
    const sizes = getWidgetSize(data.type);
    const isInRow = sizes.w + maxX > 12;
    const layouts = get().layouts.concat({
      i: id,
      x: isInRow ? 0 : maxX,
      y: isInRow ? maxY : 0,
      ...sizes,
      static: false,
    });
    const widgets = get().widgets.concat({
      id,
      ...data,
    });

    set({ layouts, widgets, isUpdated: true, editMode: false });
  },
  setUpdated: (val) => set({ isUpdated: val }),
  setDateRange: (val) => set({ dateRange: val }),
  setFrom: (val) =>
    set((state) => ({ dateRange: { ...state.dateRange, from: val } })),
  setWidgetId: (val) => set({ widgetId: val }),
}));
