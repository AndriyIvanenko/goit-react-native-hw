export const PUBLICATIONS = [
  {
    id: "id-1",
    photo: require("./assets/photo1.jpg"),
    description: "Forest in mountains",
    location: {
      locationName: "Carpathian mountains",
      locationLink: "location link 1",
    },
    comments: [
      {
        createdAt: {
          date: "09 june, 2021",
          time: "18:40",
        },
        userId: "user-1",
        comment:
          "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
      },
      {
        createdAt: {
          date: "09 june, 2021",
          time: "18:52",
        },
        userId: "user-2",
        comment:
          "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
      },
    ],
    likes: 12,
  },
  {
    id: "id-2",
    photo: require("./assets/photo2.jpg"),
    description: "Sunset on the sea",
    location: {
      locationName: "Odesa, Black Sea",
      locationLink: "location link 2",
    },
    comments: [
      {
        createdAt: {
          date: "11 may, 2020",
          time: "15:21",
        },
        userId: "user-1",
        comment:
          "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
      },
      {
        createdAt: {
          date: "11 may, 2020",
          time: "15:32",
        },
        userId: "user-2",
        comment:
          "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
      },
      {
        createdAt: {
          date: "11 may, 2020",
          time: "15:40",
        },
        userId: "user-1",
        comment: "Thank you! That was very helpful!",
      },
    ],
    likes: 11,
  },
  {
    id: "id-3",
    photo: require("./assets/photo3.jpg"),
    description: "a village in Italy",
    location: {
      locationName: "Italy, Tuscany",
      locationLink: "location link 3",
    },
    comments: [
      {
        createdAt: {
          date: "11 may, 2020",
          time: "15:21",
        },
        userId: "user-3",
        comment: "Nice work!",
      },
      {
        createdAt: {
          date: "11 may, 2020",
          time: "15:32",
        },
        userId: "user-1",
        comment:
          "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
      },
      {
        createdAt: {
          date: "11 may, 2020",
          time: "15:40",
        },
        userId: "user-2",
        comment:
          "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
      },
      {
        createdAt: {
          date: "11 may, 2020",
          time: "15:40",
        },
        userId: "user-1",
        comment: "Thank you! That was very helpful!",
      },
    ],
    likes: 21,
  },
];
