# Start with a lightweight base image
FROM ubuntu:latest

# Set up environment variables
ENV DEBIAN_FRONTEND=noninteractive
WORKDIR /workspace

# Update and install required dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    # Install general development tools
    build-essential \
    curl \
    git \
    unzip \
    wget \
    xz-utils \
    # Install Java (JDK 17)
    openjdk-17-jdk \
    # Install Node.js & npm (via NodeSource)
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    # Install Python 3 & Pip
    && apt-get install -y python3 python3-pip \
    # Install TypeScript
    && npm install -g typescript \
    # Install C++ (g++) & Make
    && apt-get install -y g++ cmake \
    # Install Rust (via rustup)
    && curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y \
    && source $HOME/.cargo/env \
    # Install Go (Golang)
    && wget https://go.dev/dl/go1.21.3.linux-amd64.tar.gz \
    && tar -C /usr/local -xzf go1.21.3.linux-amd64.tar.gz \
    && rm go1.21.3.linux-amd64.tar.gz \
    # Clean up unnecessary files
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set environment paths for Rust and Go
ENV PATH="/root/.cargo/bin:/usr/local/go/bin:$PATH"

# Verify installations
RUN java -version && \
    node -v && npm -v && \
    python3 --version && pip3 --version && \
    g++ --version && cmake --version && \
    rustc --version && cargo --version && \
    go version && tsc --version

# Default command (container stays alive)
CMD ["tail", "-f", "/dev/null"]
