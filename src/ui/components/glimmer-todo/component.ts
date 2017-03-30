import Component, { tracked } from "@glimmer/component";

interface TodoItem {
  title: string;
  checked: boolean;
}

enum Filter {
  Checked,
  Unchecked,
};

type Order = "asc" | "desc";

export default class GlimmerBzf extends Component {
  @tracked order: Order = "asc";
  @tracked showOnlyUnchecked: boolean = false;
  @tracked items: Array<TodoItem> = [
    { title: "Learn TypeScript", checked: true },
    { title: "Try out GlimmerJS", checked: true },
    { title: "Figure out the next big thing", checked: false },
  ];

  @tracked('order')
  get sortAsc(): boolean {
    return this.order == "asc";
  }

  @tracked('order')
  get sortDesc(): boolean {
    return this.order == "desc";
  }

  @tracked('items', 'showOnlyUnchecked')
  get filteredItems(): Array<TodoItem> {
    if (this.showOnlyUnchecked) {
      return this.items.filter((a) => !a.checked);
    } else {
      return this.items;
    }
  }

  @tracked('items', 'order', 'showOnlyUnchecked')
  get todoItems(): Array<TodoItem> {
    if (this.order == "asc") {
      return this.filteredItems.sort((a, b) => a.title > b.title);
    } else {
      return this.filteredItems.sort((a, b) => a.title < b.title);
    }
  }

  toggleOrder(order: Event) {
    this.order = order.target.value;
  }

  toggleChecked(item: TodoItem) {
    const nextItem = {
      ...item,
      checked: !item.checked,
    };
    const itemsWithoutItem = this.items.filter((a) => a.title != item.title);

    this.items = [
      ...itemsWithoutItem,
      nextItem,
    ];
  }

  toggleOnlyUnchecked() {
    this.showOnlyUnchecked = !this.showOnlyUnchecked;
  }
};
