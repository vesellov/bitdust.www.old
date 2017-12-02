# BitDust


## About

BitDust - is decentralized, secure and anonymous on-line storage, where only the owner has access and absolute control over its data.

Imagine a situation when two friends and you agree to help each other to store the data. On your computer you store the data that both of your friends uploaded to you via Internet, and you in turn can use the free space on their machines to save your files. This creates [redundancy](https://github.com/bitdust-io/docs/blob/master/storage.md), but allows storing important data in a safer way. It is also a fair deal, because all three are interested in the maximum safety and availability of stored information.

BitDust network is a voluntary association of people sharing resources of their personal computers. Their machines run the same copies of BitDust program, which enables device communication via Internet when data are transmitted directly from one user to another and stored on user hard disk drives. 

Uploaded input data is divided into blocks and fragments, [encrypted](https://github.com/bitdust-io/docs/blob/master/security.md) and uploaded on other users computers. The system is designed to perform continuous monitoring of each node, which stores your data.

The BitDust program constantly keeps a state, which enables you to download your data back to your machine at any moment. The mechanism of [automatic data restoring](https://github.com/bitdust-io/docs/blob/master/rebuilding.md) allows dynamic reassembling of the data fragments uploaded into the network on the new nodes without any action from the user. 

BitDust program is written in [Python](http://python.org) using [Twisted](http://twistedmatrix.com/) Framework and is distributed in open source code - we are still deciding about the license type. 

The project is in the stage of deep development, but the demo version will be available in the near future. 

We invite all who are interested in this direction - primarily developers and enthusiasts. Join our [team](https://github.com/bitdust-io), or directly [support us](https://github.com/bitdust-io/docs/blob/master/donate.md). Together we will be able to create a fairer alternative and trusted solutions than existing global networks.



## Beginning

+ [Introduction](https://github.com/bitdust-io/docs/blob/master/intro.md)
+ [Concept](https://github.com/bitdust-io/docs/blob/master/concept.md)
+ [Definitions](https://github.com/bitdust-io/docs/blob/master/definitions.md)
+ [Philosophy](https://github.com/bitdust-io/docs/blob/master/philosophy.md)
+ [How Does It Work?](https://github.com/bitdust-io/docs/blob/master/principle.md)
+ [Installation](https://github.com/bitdust-io/docs/blob/master/install.md)
+ [Commands](https://github.com/bitdust-io/docs/blob/master/commands.md)
+ [Settings](https://github.com/bitdust-io/docs/blob/master/settings.md)
+ [Glossary](https://github.com/bitdust-io/docs/blob/master/glossary.md)


## Working Principles

+ [User Identification](https://github.com/bitdust-io/docs/blob/master/identities.md)
+ [Distributed Storage](https://github.com/bitdust-io/docs/blob/master/storage.md)
+ [Data Security](https://github.com/bitdust-io/docs/blob/master/security.md)
+ [Automatic Rebuilding](https://github.com/bitdust-io/docs/blob/master/rebuilding.md)
+ [Distributed Hash-Table](https://github.com/bitdust-io/docs/blob/master/dht.md)
+ [Network services](https://github.com/bitdust-io/docs/blob/master/services.md)
+ [Transport protocols](https://github.com/bitdust-io/docs/blob/master/transports.md)
+ [Crypto-contracts](https://github.com/bitdust-io/docs/blob/master/crypto_contracts.md)


## Development

+ [Roadmap](https://github.com/bitdust-io/docs/blob/master/roadmap.md)
+ [Finite State Machines](https://github.com/bitdust-io/docs/blob/master/automats.md)
+ [Technologies](https://github.com/bitdust-io/docs/blob/master/technologies.md)
+ [API Interface](https://github.com/bitdust-io/docs/blob/master/api.md)
+ [Known bugs](https://github.com/bitdust-io/docs/blob/master/bugs.md)


## Deploying

You can just open "index.html" file in the root folder of your local "www" repository and fully automated and independent copy of the web site will be rendered in your web browser. The web site do not require database to be avaialble on your host and only serve static HTML pages at the moment.

On the live machine serving https://bitdust.io resource "www" repository is cloned and direcly loaded into WWW folder maintained by Apache2 web server. When your "Pull Request" will be merged we will execute "./update" caommand to pull changes on the live machine.


## Contributing

This repository contains .html files generated from [BitDust documentation](https://github.com/bitdust-io/docs) sources built in Markdown format. You can re-generate all of the BitDust Wiki pages this way:

    git clone https://github.com/bitdust-io/docs.git bitdust.docs
    git clone https://github.com/bitdust-io/www.git bitdust.www
    cd bitdust.www
    ./build

If you want to modify any page on the web site, create a fork of both repositories on GitHub and start making changes in corresponding .md file of "docs" repo. Then save the file and run "./build" in "www" repo - a new .html file will be generated with fresh changes you did in the .md file.

Commit and push your changes to your fork repository and start a "Pull Request", BitDust team is doing public code reviews and we will be in touch with you to go further.


[bitdust.io](https://bitdust.io)

