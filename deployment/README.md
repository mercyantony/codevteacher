# deployment

## add your main subdomain to the server ip


## install your server on the cloud and make sure you can connect it with ssh

```
ssh -i <key> <username>@server.codevteacher.com
apt update
apt install nano
```



## on your computer make sure you have ssh key

if you don't have
```
ssh-keygen
```

```
cat ~/.ssh/id_rsa.pub
```
copy public key in your clip board

## make sure you copy your public key to root ssh folder

```
sudo su
cd /root/.ssh/
nano authorized_keys
```

exit from terminal and try to login with root

```
ssh root@server.codevteacher.com
```


## generate sshkey and add into github
```
ssh-keygen

cat /root/.ssh/id_rsa.pub
```

# add hostname

```
export USE_HOSTNAME=server.codevteacher.com
sudo echo $USE_HOSTNAME > /etc/hostname
sudo hostname -F /etc/hostname

reboot
```

```
apt-get update
```

## install docker
```
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

docker --version
```

## install docker compose

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose --version
```

## install packages
```
apt install -y git wget curl zsh  tmux
```

## install ohmyzsh
```
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### change your ~/.zshrc
```
export ZSH="$HOME/.oh-my-zsh"

ZSH_THEME="intheloop"

plugins=(
git
npm
yarn
docker
docker-compose
tmux
ubuntu
)

source $ZSH/oh-my-zsh.sh

```

## add zsh at the end of file of ~/.bashrc

# follow the https://dockerswarm.rocks/ fo install docker swarm

## steps

```
docker swarm init

# Or

docker swarm init --advertise-addr $(curl ifconfig.me)
```

## Traefik Proxy with HTTPS

```
docker network create --driver=overlay traefik-public
export NODE_ID=$(docker info -f '{{.Swarm.NodeID}}')

docker node update --label-add traefik-public.traefik-public-certificates=true $NODE_ID

export EMAIL=info@codevteacher.com
export DOMAIN=traefik.codevteacher.com

export USERNAME=root

export PASSWORD=<strong password>

export HASHED_PASSWORD=$(openssl passwd -apr1 $PASSWORD)

echo $HASHED_PASSWORD


curl -L dockerswarm.rocks/traefik-host.yml -o traefik-host.yml

docker stack deploy -c traefik-host.yml traefik
```

## Swarmpit web user interface for your Docker Swarm cluster

```
export DOMAIN=swarmpit.codevteacher.com
export NODE_ID=$(docker info -f '{{.Swarm.NodeID}}')
docker node update --label-add swarmpit.db-data=true $NODE_ID
docker node update --label-add swarmpit.influx-data=true $NODE_ID

curl -L dockerswarm.rocks/swarmpit.yml -o swarmpit.yml
docker stack deploy -c swarmpit.yml swarmpit
```

