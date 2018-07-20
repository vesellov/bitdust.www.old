
How to setup the web site on Ubuntu:

    git clone -o upstream https://github.com/bitdust-io/www.git bitdust.www

    sudo apt-get install apache2

    sudo hostname -b bitdust.io

    sudo nano /etc/hosts  # add line "<IP> bitdust.io" in the end

    sudo cp bitdust.www/conf/bitdust.io.conf /etc/apache2/sites-available/

    sudo a2dissite 000-default.conf

    sudo sudo a2ensite bitdust.io.conf 

    sudo a2enmod ssl

    sudo mkdir /etc/apache2/ssl/ 

    # place certificate files "bitdust.key", "bitdust.crt", "bitdust.chain" in /etc/apache2/ssl/ folder 

    sudo apt-get install php -y

    sudo apt-get install -y php-{bcmath,bz2,intl,gd,mbstring,mcrypt,mysql,zip} && sudo apt-get install libapache2-mod-php  -y

    sudo service apache2 restart

