import React, { Component } from "react";
import MenuListItem from "./MenuListItem";

//lists menu items
class MenuList extends Component {
  render() {
    const { menu, deleteEvent, category, arr, handleEdition } = this.props;

    return (
      <div>
        {menu &&
          menu.map(
            item =>
              item.category === arr && (
                <MenuListItem
                  key={item.id}
                  item={item}
                  deleteEvent={deleteEvent}
                  handleEdition={handleEdition}
                />
              )
          )}
      </div>
    );
  }
}
export default MenuList;
