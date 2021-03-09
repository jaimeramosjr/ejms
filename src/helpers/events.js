export class Events
{
  constructor()
  {
    this.events = {};
  }

  listen(event, callback)
  {
    if(!this.events[event])
      this.events[event] = [];

    this.events[event].push(callback);
  }

  trigger(event, params)
  {
    if(!this.events[event])
      return;

    for(const callback of this.events[event])
      callback(params);
  }
}
