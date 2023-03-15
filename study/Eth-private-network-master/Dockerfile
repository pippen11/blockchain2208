FROM golang:1.18

COPY ./go-ethereum /home/go-ethereum

WORKDIR /home/go-ethereum

RUN sudo apt install -y build-essential libmp3-dev tree make
RUN make geth

WORKDIR /home/go-ethereum/build/bin

COPY ./bootnode ./

RUN bootnode --nodekey boot.key -verbosity 9 

# RUN apt-get update
# RUN apt-get install golang 
# RUN apt-get install -y build-essential libgmp3-dev tree make build-essential

# RUN git clone https://github.com/udhos/update-golang
# RUN cd update-golang
# RUN sudo ./update-golang.sh

# RUN make geth
# RUN cd build/bin/geth /user/local/bin

# WORKDIR /home/DATA_STORE
# COPY ./testnet.json /home/DATA_STORE



