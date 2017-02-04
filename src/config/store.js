const store = {
  stores: [
    {
      name: 'users',
      options: {
        timestampData: true,
      },
      indexingOpts: [
        {
          fieldName: 'username',
          unique: true,
        },
      ],
    },
    {
      name: 'tempUsers',
      options: {
        timestampData: true,
      },
      indexingOpts: [
        {
          fieldName: 'username',
          unique: true,
        },
        {
          fieldName: 'updatedAt',
          expireAfterSeconds: 3600,
        },
      ],
    },
  ],
};

export {
  store as default,
};
