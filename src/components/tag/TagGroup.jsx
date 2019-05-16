import React from "react";
import { tagColorList } from "@/enums/home";
import Tag from "./Tag";
export default class TagGroup extends React.Component {
    render() {
        const { list } = this.props;
        let count = 0;
        return (
            <div>
                {list.map((item, index) => {
                    if (count === tagColorList.length - 1) {
                        count = 0;
                    }
                    const inner = (
                        <Tag
                            color={tagColorList[count]}
                            text={item}
                            key={index}
                        />
                    );
                    count++;
                    return inner;
                })}
            </div>
        );
    }
}
