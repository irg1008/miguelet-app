import type { ContextId, QRL } from '@builder.io/qwik';
import { $, createContextId, useContext, useContextProvider, useStore } from '@builder.io/qwik';

type MapStore<T> = {
  map: Record<string, T>;
  add: QRL<(id: string, audio: T) => void>;
  remove: QRL<(id: string) => void>;
};

type ContextParams<T> = {
  Context: ContextId<MapStore<any>>;
  onAdd?: QRL<(id: string, map: MapStore<T>['map']) => void>;
  onRemove?: QRL<(id: string, map: MapStore<T>['map']) => void>;
};

export const createMapContext = <T>() => createContextId<MapStore<T>>('map-context');

export const useMap = <T>(context: ContextParams<T>['Context']) => useContext(context);

export const useMapProvider = <T>({ Context, onAdd, onRemove }: ContextParams<T>) => {
  const store = useStore<MapStore<T>>({
    map: {},
    add: $(function (id: string, el: T) {
      /* @ts-ignore */ // This is not correctly typed.
      onAdd?.(id, this.map);
      /* @ts-ignore */
      this.map[id] = el;
    }),
    remove: $(function (id: string) {
      /* @ts-ignore */
      onRemove?.(id, this.map);
      /* @ts-ignore */
      delete this.map[id];
    }),
  });

  useContextProvider<MapStore<T>>(Context, store);
};
