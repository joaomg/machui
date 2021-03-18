# machui
The frontend for MACHine for data processing platform.

This is a [Next.js](https://nextjs.org/) project.

The backend service https://github.com/joaomg/mach.

This is a development version, still is (very) early days. 

It's possible to create, edit and delete tenants. 

## Development

### Clone mach and enter directory
```bash
git clone https://github.com/joaomg/machui.git

cd machui
```

### Install the dependencies 
```bash
npm install
# or
yarn
```

### Run the development server

```bash
npm run dev
# or
yarn dev
```

### Launch the backend service 
If not already executing:

```bash
cd ~/mach
nimble run mach config/dev_localhost.cfg
```

See details in https://github.com/joaomg/mach

### Open machui in localhost
http://localhost:3000/

### Manage the tenants
http://localhost:3000/tenant
