
import { Button, Table, Tag} from 'antd'


function NewsPublish(props) {
    console.log("-->",props.dataSource)

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            render: (title,item) => {
                return <a href={`/news-manages/preview/${item.id}`}>{title}</a>
            }
        },
        {
            title: 'Author',
            dataIndex: 'author'
        },
        {
            title: "Category",
            dataIndex: 'category',
            render: (category) => {
                return <div>{category.title}</div>
            }
        },
        {
            title: "Modification",
            render: (item) => {
                return <div>
                    {props.button(item.id)}
                </div>
            }
        }
    ];



    return (
        <div>
            <Table dataSource={props.dataSource} columns={columns}
                pagination={{
                    pageSize: 5
                }}
                rowKey={item=>item.id}
                />
        </div>
    )
}

export default NewsPublish;