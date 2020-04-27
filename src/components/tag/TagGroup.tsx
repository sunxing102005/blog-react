import * as React from "react";
import { tagColorList } from "@/enums/home";
import Tag from "./Tag";
type tagProps = {
    list: Array<string>;
    style: object;
};
export default class TagGroup extends React.Component<tagProps, {}> {
    render() {
        const { list, style } = this.props;
        let count = 0;
        return (
            <div style={style ? style : {}}>
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
