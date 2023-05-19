export const state = {
    wallPage: {
        textAreaState: '',
        editData: {
            status: false,
            index: 0
        },
        userPosts: [
            {
                id: 1,
                text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, aperiam maiores odio vero molestias aspernatur eum temporibus magnam natus ducimus repudiandae adipisci necessitatibus quibusdam obcaecati voluptatibus facere neque tempora nulla.',
                likes: [9, 2, 3, 1],
                sent: 1672259123420,
            },
            {
                id: 2,
                text: 'This is the second post!',
                likes: [],
                sent: 1672259215520,
            },
            {
                id: 3,
                text: 'Props is props.text named!',
                likes: [2, 3],
                sent: 1672259164367,
            },
            {
                id: 4,
                text: '4th post is here.',
                likes: [],
                sent: 1672259713457,
            },
            {
                id: 5,
                text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, aperiam maiores odio vero molestias aspernatur eum temporibus magnam natus ducimus repudiandae adipisci necessitatibus quibusdam obcaecati voluptatibus facere neque tempora nulla.',
                likes: [1, 2, 32, 323, 23],
                sent: 1672251643744,
            },
            {
                id: 'someRandomId',
                text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, aperiam maiores odio vero molestias aspernatur eum temporibus magnam natus ducimus repudiandae adipisci necessitatibus quibusdam obcaecati voluptatibus facere neque tempora nulla.',
                likes: [1],
                sent: 1672259719420,
            }
        ]
    }
}

const [state, dispatch] = useReducer(wallReducer, initializerArg = state)