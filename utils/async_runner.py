# utils/async_runner.py

import asyncio


async def gather_tasks(tasks):
    """
    Execute multiple async tasks concurrently.
    """
    return await asyncio.gather(*tasks)