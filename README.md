# Mina Backend Setup Instructions

## 1. Run Docker Compose

To start the services defined in your `docker-compose.yml` file, run the following command:

```bash
docker-compose up -d
 ```



# 2. Run Backend

To run the backend, follow these steps:

1. **Install Dependencies**: Run the following command to install all necessary dependencies:

    ```bash
    yarn
    ```

2. **Start the Development Server**: After the dependencies are installed, start the development server by running:

    ```bash
    yarn dev
    ```

### Full Command Sequence

For convenience, you can execute both commands in one line by using:

```bash
yarn && yarn dev