import items from './items.js';

class itemController {
  async create(request, response) {
    const todo = new items(request.body);
    todo.save((err, task) => {
      if (err || !task) {
        return response.status(500).json({
          error: 'Oops, error',
        });
      }
      console.log('task', task);
      const result = {
        id: task._id,
        value: task.value,
        checked: task.checked,
      };
      console.log('result', result);
      response.json(result);
    });
  }

  async getAllItems(request, response) {
    try {
      const userId = request.headers.userid;

      const allItems = await items.find({ userId });

      const result = allItems.map((item) => ({
        value: item.value,
        checked: item.checked,
        userId: item.userId,
        id: item._id,
      }));

      return response.json(result);
    } catch (e) {
      response.status(500).json(e);
    }
  }

  async updateOne(request, response) {
    try {
      const { id } = request.params;
      const { checked } = request.body;

      await items.findByIdAndUpdate(id, { checked });

      return response.json('OK');
    } catch (e) {
      response.status(500).json(e);
    }
  }

  async updateMany(request, response) {
    try {
      const item = request.body;

      const itemToUpdate = {
        value: item.value,
        checked: item.checked,
      };

      const updatedItems = await items.updateMany({}, itemToUpdate, {
        new: true,
      });
      return response.json(updatedItems);
    } catch (e) {
      response.status(500).json(e);
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;

      await items.findByIdAndDelete(id);

      return response.json(items);
    } catch (e) {
      response.status(500).json(e);
    }
  }

  async deleteChecked(request, response) {
    const { itemId } = request.body;

    try {
      await items.deleteMany({
        _id: { $in: itemId },
      });

      return response.json({ status: 'OK' });
    } catch (e) {
      response.status(500).json(e);
    }
  }
}

export default new itemController();
