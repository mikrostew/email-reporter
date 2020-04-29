# email-reporter

REST server that sends POST-ed email reports to a preset email.

## Installation

Just clone this like you would any other repo, and install dependencies.

```
$ git clone https://github.com/mikrostew/email-reporter.git
$ cd email-reporter/
$ yarn
```

If you use [Volta](https://github.com/volta-cli/volta), you will automatically have the right versions of Node and Yarn for this project.


## Configuration

Currently the only way to configure this is through a config file. This contains the SMTP settings, and the to & from addresses.

Put a file named `.email-reporter` in the root directory of the project. This file is JSON format, but can have comments (it's using [yam](https://github.com/twokul/yam)). It should contain all these fields like this example:

```javascript
{
  // the address in the from field
  "from": "\"Some Name\" <me@my.email>",
  // comma-separated list
  "to": "user@their.email",
  "smtp": {
    "host": "smtp.my.email",
    // port 587 is also typical
    "port": 465,
    "secure": true,
    // secure: false - if it can upgrade using STARTTLS
    // whatever your username is to login to the email service
    "user": "me@my.email"
  }
}
```

Don't put the password in there! This does not read the password from the config file, because I'm not comfortable with storing passwords in plain text for this.


## Starting the server

This will prompt for your password, and then start up the server. You can optionally specify a port with `--port`, default is 3000.

```
$ node index.js
Password for me@my.email:
app listening at http://localhost:3000
```

## GET /status

This returns a bunch of info about the server, some of which is node-specific.

```
$ curl http://localhost:3000/status | jq '.'
{
  "states": [
    "running",
    "running",
    "running",
    "running"
  ],
  "configIsLoaded": true,
  "passwordIsEntered": true,
  "numberOfEmailsSent": 0,
  "serverIsRunning": true,
  "uptime": 162531.055158462,
  "memoryUsage": {
    "rss": 41623552,
    "heapTotal": 6955008,
    "heapUsed": 5601548,
    "external": 1512079
  },
  "cpuUsage": {
    "user": 2674248,
    "system": 121637
  },
  "resourceUsage": {
    "userCPUTime": 2674318,
    "systemCPUTime": 121637,
    "maxRSS": 40648,
    "sharedMemorySize": 0,
    "unsharedDataSize": 0,
    "unsharedStackSize": 0,
    "minorPageFault": 5330,
    "majorPageFault": 2,
    "swappedOut": 0,
    "fsRead": 456,
    "fsWrite": 0,
    "ipcSent": 0,
    "ipcReceived": 0,
    "signalsCount": 0,
    "voluntaryContextSwitches": 422,
    "involuntaryContextSwitches": 95
  }
}
```

## POST /email-report

Send a POST to this endpoint, and it will forward the contents as an email to the configured address.

Right now this only accepts JSON, so you need to use a `Content-Type: application/json` header.

The data should include:
* `subject` for the email subject
* `html` for the HTML contents of the email
* [optional] `text` for plain text of the email - this is used by some clients for the email preview

So using `curl` would look something like this:

```bash
curl "http://localhost:3000/email-report" \
  -X POST \
  --header "Content-Type: application/json" \
  --data '{"subject": "Email subject", "text": "Some things", "html": "Here are <b>some things</b> you wanted."}'
```

## Help text

This is the current help text:

```
$ node index.js --help

  REST server that sends POST-ed email reports to a preset email

  Usage
    $ node index.js [options]

  Options
    --port, -p  Port number for the server (default 3000)

  Examples
    $ node index.js --port 3456
    Password for user.name@email.com:
    app listening at http://localhost:3456
```
