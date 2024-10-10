const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalCost: 0,
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      state.totalCost += action.payload.price; // Assuming payload has a price property
    },
    removeItem: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.totalCost -= state.items[index].price;
        state.items.splice(index, 1);
      }
    },
  },
});
